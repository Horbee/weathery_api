import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";

import { startApp } from "./cluster";
import { AppConfig } from "./config/appconfig";
import { connectDB } from "./db";
import { errorHandler } from "./middleware/errorhandler.middleware";
import { swaggerDocument } from "./openAPI/swagger";
import { authRoutes } from "./routes/auth.routes";
import { cityRoutes } from "./routes/city.routes";
import { weatherRoutes } from "./routes/weather.routes";

const app = express();

const corsOptions = {
  origin: AppConfig.allowedHosts.split(";"),
};

// Init middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());

require("./services/jwtStrategy");
require("./services/googleStrategy");
require("./services/facebookStrategy");

if (AppConfig.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      skip: (req, res) => res.statusCode < 400,
    })
  );
}

app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Controller Routes
app.use("/api/auth", authRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/cities", cityRoutes);

// Use our error handler middleware
app.use(errorHandler);

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
