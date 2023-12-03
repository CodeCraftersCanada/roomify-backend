require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// ROUTES
const usersRouter = require('./routes/userRoutes');
const {once} = require("./config/db");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// API ENDPOINTS
app.use('/api/v1', usersRouter);

process.env.TZ = 'UTC';
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
