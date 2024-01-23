import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";
import credentials from "./middlewares/credentials";
import corsOptions from "./config/corsOptions";
import authRoutes from "./routes/auth.routes";
import registerRoute from "./routes/register.routes";
import refreshTokenRoutes from "./routes/refresh.routes";
import logoutRoute from "./routes/logout.routes";
import authenticatedRoutes from "./routes/api/authenticated";

const app = express();

// Apply credentials middleware before CORS middleware
app.use(credentials);

// Cross-Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware for handling urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Middleware for JSON parsing
app.use(express.json());

// Middleware for cookies
app.use(cookieParser());

// Routes
app.use("/register", registerRoute);
app.use("/auth", authRoutes);
app.use("/refresh", refreshTokenRoutes);
app.use("/logout", logoutRoute);

// Use the authenticated route
app.use("/authenticated", authenticatedRoutes);

// 404 Not Found handler
app.all("*", (req, res) => {
  res.status(404).json({ error: "The requested route could not be found." });
});

app.use(errorHandler);

export default app;
