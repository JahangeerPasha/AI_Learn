import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    dailyTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Preferences", preferencesSchema);
