const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

// DB CONNECTION

if (config.env === "development") mongoose.set("debug", true);
mongoose
  .connect(
    `${config.mongoose.PROTOCOL}://${config.mongoose.HOST}:${config.mongoose.DB_PORT}/${config.mongoose.DATABASE}`,
    {
      authSource: "admin",
      user: config.mongoose.DB_USERNAME,
      pass: config.mongoose.DB_PASSWORD,
    }
  )
  .then(() => {
    logger.info("Connected to MongoDB");
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
