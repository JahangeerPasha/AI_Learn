import express from "express";
import Preferences from "../models/preferences.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* SAVE / UPDATE PREFERENCES */
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("USER ID:", req.userId); // 🔍 DEBUG
    console.log("BODY:", req.body);

    const { level, interest, goal, dailyTime } = req.body;

    const preferences = await Preferences.findOneAndUpdate(
      { userId: req.userId },
      { level, interest, goal, dailyTime },
      { upsert: true, new: true }
    );

    res.json(preferences);
  } catch (err) {
    console.error("PREFERENCES ERROR:", err);
    res.status(500).json({ message: "Failed to save preferences" });
  }
});


/* GET PREFERENCES */
router.get("/", authMiddleware, async (req, res) => {
  const preferences = await Preferences.findOne({ userId: req.userId });
  res.json(preferences);
});

export default router;
