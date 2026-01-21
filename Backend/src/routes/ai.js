import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getAIResponse from "../utils/ai.js";
import Preference from "../models/preferences.js";

const router = express.Router();

/**
 * POST /api/ai/chat
 */
router.post("/chat", authMiddleware, async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  try {
    const preferences = await Preference.findOne({ user: req.userId });

    const prompt = `
You are an AI tutor.

User Profile:
- Level: ${preferences?.level || "Unknown"}
- Interest: ${preferences?.interest || "General"}
- Goal: ${preferences?.goal || "Learning"}
- Daily Time: ${preferences?.dailyTime || "Not specified"}

User Question:
${message}

Answer clearly and beginner-friendly.
`;

    const reply = await getAIResponse(prompt);

    res.json({ reply });
  } catch (err) {
    console.error("AI Chat Error:", err);
    res.status(500).json({ message: "AI Tutor failed" });
  }
});

/**
 * GET /api/ai/learning-path
 */
router.get("/learning-path", authMiddleware, async (req, res) => {
  try {
    const preferences = await Preference.findOne({ userId: req.userId });

    if (!preferences) {
      return res.status(400).json({ message: "Preferences not set" });
    }

const prompt = `
Create a personalized learning path.

User:
Level: ${preferences.level}
Interest: ${preferences.interest}
Goal: ${preferences.goal}

Rules:
- 5 to 7 steps
- Each step on a NEW LINE
- Each step should have a short title followed by a brief description
- Beginner friendly
- Plain text only
`;


    const reply = await getAIResponse(prompt);

    res.json({ learningPath: reply });
  } catch (err) {
    console.error("Learning Path Error:", err);
    res.status(500).json({ message: "Failed to generate learning path" });
  }
});

export default router;
