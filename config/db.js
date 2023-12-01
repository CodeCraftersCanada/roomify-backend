const mongoose = require('mongoose');

const username = 'username';
const password = 'password';
const url = `mongodb://${username}:${password}@127.0.0.1/`;

// Generate DB connection
mongoose.connect(url, {
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
