require('dotenv').config();

const mongoose = require('mongoose');

// Generate DB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error', error);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = db;
