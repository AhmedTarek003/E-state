const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./middleware/globalError");
require("dotenv").config();
const connectDB = require("./db/connectionDB");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// DB
connectDB();

// app
const app = express();

// middleware
app.use(express.json({ limit: "20kb" }));
app.use(cors());
// Use helmet to set security-related headers
app.use(helmet());
// protect http headers
app.use(hpp());

// middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.
app.use(mongoSanitize());

// // Limit each IP to 100 requests per `window` (here, per 15 minutes).
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5,
  message: "too many requests please wait, and try again after 15 minutes",
});

// Apply the rate limiting middleware to all requests.
app.use("/api/password", limiter);

// routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/listings", require("./routes/listingRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

app.use("*", (req, res, next) => {
  next(new Error("this route not found"));
});

// Global Error Handler
app.use(globalErrorHandler);

// Port
const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log(`server is running on port ${PORT}`)
);
process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection Error: ${err.message}`);
  server.close(() => {
    console.log("shutting down.........");
    process.exit(1);
  });
});
