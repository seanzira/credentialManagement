const express = require('express');
const User = require('../models/User');
const Division = require('../models/Division');
const OU = require('../models/Ou');

const router = express.Router();

// Assign a user to a division and OU
router.post('/assign-user', async (req, res) => {
    const { username, divisionId, ouId } = req.body;

    // Check for required fields
    if (!username || !divisionId || !ouId) {
        return res.status(400).json({ message: 'Username, Division ID, and OU ID are required.' });
    }

    try {
        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Validate the division
        const division = await Division.findById(divisionId);
        if (!division) {
            return res.status(400).json({ message: 'Invalid Division ID.' });
        }

        // Validate the OU
        const ou = await OU.findById(ouId);
        if (!ou) {
            return res.status(400).json({ message: 'Invalid OU ID.' });
        }

        // Assign division and OU to user
        user.division = divisionId;
        user.ou = ouId;
        await user.save();

        res.status(200).json({ message: 'User assigned successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Design a user (you can expand this based on your requirements)
router.put('/design-user/:userId', async (req, res) => {
    const { userId } = req.params;
    const { divisionId, ouId } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Assign new division and OU if provided
        if (divisionId) {
            const division = await Division.findById(divisionId);
            if (!division) {
                return res.status(400).json({ message: 'Invalid Division ID.' });
            }
            user.division = divisionId;
        }

        if (ouId) {
            const ou = await OU.findById(ouId);
            if (!ou) {
                return res.status(400).json({ message: 'Invalid OU ID.' });
            }
            user.ou = ouId;
        }

        await user.save();
        res.status(200).json({ message: 'User designed successfully.', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
