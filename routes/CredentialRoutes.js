const express = require('express');
const bcrypt = require('bcryptjs');
const Credential = require('../models/Credential');
const Division = require('../models/Division');
const verifyToken = require('../FrontEnd/credential-manager/src/components/Profile')

const router = express.Router();

// View Division Credentials endpoint
router.get('/division/:id/credentials', verifyToken, async (req, res) => {
    const divisionId = req.params.id;

    try {
        // Find the division by ID
        const division = await Division.findById(divisionId).populate('ou');
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        // Check user permissions
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Fetch credentials for the division 
        const credentials = await Credential.find({ division: divisionId }); 

        // Respond with the credentials
        res.json(credentials);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint for adding a credential
router.post('/add-credential', async (req, res) => {
    const { username, password, service, divisionId } = req.body;

    // Check if required fields are provided
    if (!username || !password || !service || !divisionId) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        // Validate the division ID
        const division = await Division.findById(divisionId);
        if (!division) {
            return res.status(400).json({ message: 'Invalid division ID' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new credential
        const newCredential = new Credential({
            username,
            password: hashedPassword,
            service,
            division: divisionId,
        });

        await newCredential.save();

        res.status(201).json({ message: 'Credential added successfully', credential: newCredential });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint for updating a specific credential
router.put('/update-credential/:id', async (req, res) => {
    const { username, password, service } = req.body;

    try {
        // Find the credential by ID
        const credential = await Credential.findById(req.params.id);
        if (!credential) {
            return res.status(404).json({ message: 'Credential not found' });
        }

        // Update fields if provided
        if (username) credential.username = username;
        if (service) credential.service = service;
        if (password) {
            // Hash the new password
            credential.password = await bcrypt.hash(password, 10);
        }

        await credential.save();

        res.json({ message: 'Credential updated successfully', credential });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
