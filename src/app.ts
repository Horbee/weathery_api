import { config as envConfig } from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./db";
import { swaggerDocument } from "./openAPI/swagger";
import { userRoutes } from "./routes/user.routes";
import { weatherRoutes } from "./routes/weather.routes";

envConfig({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 5000;

// Init middlewares
app.use(express.json());
app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Controller Routes
app.use("/api/auth", userRoutes);
app.use("/api/weather", weatherRoutes);

// connect Mongo DB
connectDB();

app.listen(port, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode, on port ${port}`)
);
