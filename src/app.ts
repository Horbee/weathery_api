import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { startApp } from "./cluster";
import { AppConfig } from "./config/appconfig";
import { connectDB } from "./db";
import { swaggerDocument } from "./openAPI/swagger";
import { oauthRoutes } from "./routes/oauth.routes";
import { userRoutes } from "./routes/user.routes";
import { weatherRoutes } from "./routes/weather.routes";

const app = express();

const corsOptions = {
  origin: AppConfig.allowedHosts.split(";")
};

// Init middlewares
app.use(cors(corsOptions));

app.use(express.json());

if (AppConfig.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      skip: (req, res) => res.statusCode < 400
    })
  );
}

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Controller Routes
app.use("/api/auth", userRoutes);
app.use("/api/oauth", oauthRoutes);
app.use("/api/weather", weatherRoutes);

startApp(AppConfig.clusterMode, () => {
  // connect Mongo DB
  connectDB();
  // start app
  app.listen(AppConfig.port, () =>
    console.log(
      `Server started in ${AppConfig.nodeEnv} mode, on port ${AppConfig.port}, Worker PID: ${process.pid}`
    )
  );
});
