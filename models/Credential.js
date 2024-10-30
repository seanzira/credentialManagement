const mongoose = require('mongoose');

// Schema for Credential model
const CredentialSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    service: { type: String, required: true },
    division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division', required: true },
});

// Exporting credential model 
module.exports = mongoose.model('Credential', CredentialSchema);
