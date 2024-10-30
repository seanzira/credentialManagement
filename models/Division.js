const mongoose = require('mongoose');

// Schema for the Division model
const DivisionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 1 },
  ou: { type: mongoose.Schema.Types.ObjectId, ref: 'OU', required: true },
  description: { type: String },
}, { timestamps: true}
);

// Export Division model
module.exports = mongoose.model('Division', DivisionSchema);
