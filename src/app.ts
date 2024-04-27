import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";

import { AppConfig } from "./config/appconfig";
import { connectDB } from "./db";
import { errorHandler } from "./middleware/errorhandler.middleware";
import { swaggerDocument } from "./openAPI/swagger";
import { v1AuthRoutes } from "./routes/v1/auth.routes";
import { v1CityRoutes } from "./routes/v1/city.routes";
import { v1WeatherRoutes } from "./routes/v1/weather.routes";

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
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Controller Routes
app.use("/api/v1/auth", v1AuthRoutes);
app.use("/api/v1/weather", v1WeatherRoutes);
app.use("/api/v1/cities", v1CityRoutes);

// Use our error handler middleware
app.use(errorHandler);

// connect Mongo DB
connectDB();
// start app
app.listen(AppConfig.port, () =>
  console.log(
    `Server started in ${AppConfig.nodeEnv} mode, on port ${AppConfig.port}, Worker PID: ${process.pid}`
  )
);
