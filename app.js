require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// ROUTES
const usersRouter = require("./routes/userRoutes");
const propertyRouter = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const { once } = require("./config/db");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API ENDPOINTS
app.use("/api/v1", usersRouter);
app.use("/api/v1", propertyRouter);
app.use("/api/v1", bookingRoutes);

process.env.TZ = "UTC";
const PORT = process.env.PORT || 3002;

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
