import express from "express";
import bodyParser from "body-parser";
import imageRoutes from "./routes/imageRoutes";
import errorHandler from "./utils/errorHandler";
import path from "path";
import morgan from "morgan";
import fs from "fs";

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Routes
app.use(imageRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
