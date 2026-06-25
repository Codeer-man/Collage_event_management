import express from "express";
import "dotenv/config";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import { notfound } from "./middleware/not-found.js";
import cors from "cors";
import { authRoute } from "./routes/auth/auth.route.js";
import { facultyRoute } from "./routes/admin/faculty.route.js";

const app = express();

const corsorigin = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: corsorigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use("/health", (_req, res) => {
  res.status(200).json({ message: "Server is healthy in running state" });
});

// auth
app.use("/auth", authRoute);

//admin
app.use("/admin", facultyRoute);

app.use(notfound);
app.use(errorHandler);

export default app;
