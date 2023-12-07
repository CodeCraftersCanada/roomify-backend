require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// ROUTES
const usersRouter = require('./routes/userRoutes');
const propertyRouter = require('./routes/propertyRoutes');

const {once} = require("./config/db");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// API ENDPOINTS
app.use('/api/v1', usersRouter);
app.use('/api/v1', propertyRouter);

process.env.TZ = 'UTC';
const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
