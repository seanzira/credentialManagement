const mongoose = require('mongoose');

// Schema for an OU model
const OUSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

// Export OU model to be used in other parts of the application
module.exports = mongoose.model('OU', OUSchema);
