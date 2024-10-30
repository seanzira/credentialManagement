const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes =require('./routes/userRoutes');
const userAssignmentRoutes = require('./routes/UserAssignmentRoutes');
const CredentialRoutes = require('./routes/CredentialRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/credentials', CredentialRoutes);
app.use('/api/user-assignment', userAssignmentRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
