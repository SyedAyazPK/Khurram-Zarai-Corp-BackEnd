const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const morgan = require("./config/morgan");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const { authLimiter } = require("./middlewares/rateLimiter");
const config = require("./config/config");
const { errorConverter, errorHandler } = require("./middlewares/error");
const routes = require("./routes/v1");
const { jwtStrategy } = require("./config/passport");
const ApiError = require("./utils/ApiError");
const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Enable CORS
app.use(cors());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/v1/auth", authLimiter);
}

// For file uploading
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

cloudinary.v2.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// v1 api routes
app.use("/v1", routes);

app.use("/test", (req, res) => {
  res.status(200).json({
    message: "Api called cors successfully",
    date: new Date(),
  });
});

// handle preflight requests
app.options("*", cors());

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
