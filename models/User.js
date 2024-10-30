const mongoose = require('mongoose');

// Schema for a User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'management', 'normal'], default: 'normal' },
    ou: { type: mongoose.Schema.Types.ObjectId, ref: 'OU' }, 
    division: { type: mongoose.Schema.Types.ObjectId, ref: 'Division' },
});

// Export the User model to be used in other parts of the application
module.exports = mongoose.model('User', UserSchema);
