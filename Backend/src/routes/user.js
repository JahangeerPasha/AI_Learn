import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from '../models/user.js';
const router = express.Router();

// router.get("/profile", authMiddleware, (req, res) => {
//   res.json({
//     message: "Access granted",
//     userId: req.userId,
//   });
// });
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});


export default router;
