const path = require("path");
const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
    .keys({
      NODE_ENV: Joi.string()
        .valid("production", "development", "test")
        .required(),
      PORT: Joi.number().default(5500),
      PROTOCOL: Joi.string().required().description("Protocol"),
      DB_USERNAME: Joi.string().required().description("Db Username"),
      DB_PASSWORD: Joi.string().required().description("Db Password"),
      HOST: Joi.string().required().description("Host"),
      DB_PORT: Joi.string().required().description("Db Port"),
      DATABASE: Joi.string().required().description("Db Name"),
      JWT_SECRET: Joi.string().required().description("JWT secret key"),
      JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
        .default(30)
        .description("minutes after which access tokens expire"),
      JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
        .default(30)
        .description("days after which refresh tokens expire"),
      JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description("minutes after which reset password token expires"),
      JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description("minutes after which verify email token expires"),
      SMTP_HOST: Joi.string().description("server that will send the emails"),
      SMTP_PORT: Joi.number().description(
        "port to connect to the email server"
      ),
      SMTP_USERNAME: Joi.string().description("username for email server"),
      SMTP_PASSWORD: Joi.string().description("password for email server"),
      EMAIL_FROM: Joi.string().description(
        "the from field in the emails sent by the app"
      ),
      CLIENT_ID: Joi.string().description("for google sign in"),
      CLIENT_SECRET: Joi.string().description("for google sign in"),
      CLOUDINARY_CLOUD_NAME: Joi.string()
        .required()
        .description("Cloudinary Cloud Name"),
      CLOUDINARY_API_KEY: Joi.string()
        .required()
        .description("Cloudinary Cloud Api Key"),
      CLOUDINARY_SECRET_API_KEY: Joi.string()
        .required()
        .description("Cloudinary Cloud Api Secret Key"),
    })
    .unknown(),
  { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,

  mongoose: {
    PROTOCOL: envVars.PROTOCOL,
    DB_USERNAME: envVars.DB_USERNAME,
    DB_PASSWORD: envVars.DB_PASSWORD,
    HOST: envVars.HOST,
    DB_PORT: envVars.DB_PORT,
    DATABASE: envVars.DATABASE,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: false,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  googleAuth: {
    clientId: envVars.CLIENT_ID,
    clientSecret: envVars.CLIENT_SECRET,
  },
  cloudinary: {
    cloudName: envVars.CLOUDINARY_CLOUD_NAME,
    apiKey: envVars.CLOUDINARY_API_KEY,
    apiSecret: envVars.CLOUDINARY_SECRET_API_KEY,
  },
};
