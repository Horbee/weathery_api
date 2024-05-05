import { config as envConfig } from "dotenv";

envConfig({ path: "./config.env" });

export const AppConfig = {
  nodeEnv: process.env.NODE_ENV || "production",
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/weathery",
  openweatherAPI: process.env.OPENWEATHER_API,
  allowedHosts: process.env.ALLOWED_HOSTS || "http://localhost:3000",
  appID: process.env.APP_ID || "1234",
  appName: process.env.APP_NAME || "WeatheryDEV",
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "private",
  jwtPublicKey: process.env.JWT_PUBLIC_KEY || "public",
  emailFrom: process.env.EMAIL_FROM || "noreply@example.com",
  emailServer: process.env.EMAIL_SERVER || "smtp://localhost:1025",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  googleClientID: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  facebookClientID: process.env.FACEBOOK_CLIENT_ID || "",
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
};
