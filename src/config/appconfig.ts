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
  clusterMode: process.env.CLUSTER_MODE === "true" || false
};
