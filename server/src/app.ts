import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import { notfound } from "./middleware/not-found.js";
import cors from "cors";
import { authRoute } from "./routes/auth/auth.route.js";
import { superRoute } from "./routes/administrative/administrative.route.js";
import cookieParser from "cookie-parser";
import { frontendUrl } from "./lib/getUrl.js";

const app = express();

app.use(
  cors({
    origin: frontendUrl(),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use("/health", (_req, res) => {
  res.status(200).json({ message: "Server is healthy in running state" });
});

// auth
app.use("/auth", authRoute);

//administrative
app.use("/super", superRoute);

app.use(notfound);
app.use(errorHandler);

export default app;
