const mongoose = require('mongoose');
const User = require('../models/User'); 

// Sample data to be inserted into the collection
const sampleUsers = [
    {
        username: 'admin_user',
        password: 'adminPassword123',
        role: 'admin',
        ou: '60d21b4667d0d8992e610c85', 
    },
    {
        username: 'management_user',
        password: 'managementPassword456',
        role: 'management',
        ou: '60d21b4667d0d8992e610c86', 
    },
    {
        username: 'normal_user1',
        password: 'userPassword789',
        role: 'normal',
        ou: '60d21b4667d0d8992e610c87',
    },
    {
        username: 'normal_user2',
        password: 'userPassword101',
        role: 'normal',
        ou: '60d21b4667d0d8992e610c88',
    },
    {
        username: 'normal_user3',
        password: 'userPassword2023',
        role: 'normal',
        ou: '60d21b4667d0d8992e610c89', 
    },
];

// Establishing a connection with the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/managing-credentials', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Function to insert the data into the collection
const seedDB = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        const insertedData = await User.insertMany(sampleUsers);
        console.log('Sample data inserted:', insertedData);
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Function to run the seeder
const runSeeder = async () => {
    await connectDB();
    await seedDB();
};

// Calling the function to run the seeder
runSeeder();
