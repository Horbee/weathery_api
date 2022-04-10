import { config as envConfig } from "dotenv";

envConfig({ path: "./config.env" });

export const AppConfig = {
  nodeEnv: process.env.NODE_ENV || "production",
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/weathery",
  openweatherAPI: process.env.OPENWEATHER_API,
  appID: process.env.APP_ID || "1234",
  appName: process.env.APP_NAME || "WeatheryDEV",
  jwtPrivateKey: process.env.JWT_PRIVATE_KEY || "private",
  jwtPublicKey: process.env.JWT_PUBLIC_KEY || "public",
  allowedHosts: process.env.ALLOWED_HOSTS || "http://localhost:3000",
  clusterMode: process.env.CLUSTER_MODE === "true" || false,
  mailSystem: process.env.MAIL_SYSTEM === "true" || false,
  mailAPIKey: process.env.MAIL_API || "",
  mailFrom: process.env.MAIL_FROM || "",
  forgotPasswordMailTemplate: process.env.FORGOT_PW_TEMPLATE || "",
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  googleClientID: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  facebookClientID: process.env.FACEBOOK_CLIENT_ID || "",
  facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
};
