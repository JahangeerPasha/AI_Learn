import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/connectDB.js";
import authRoutes from './src/routes/auth.js';
import userRoutes from './src/routes/user.js';
import preferencesRoutes from "./src/routes/preferences.js";
import aiRoutes from "./src/routes/ai.js";
connectDB();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/ai", aiRoutes);

// app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
console.log("GROQ KEY:", process.env.GROQ_API_KEY);

