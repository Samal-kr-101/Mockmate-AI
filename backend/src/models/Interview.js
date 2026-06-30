import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    selectedRole: {
      type: String,
      required: true
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy"
    },

    totalQuestions: {
      type: Number,
      default: 10
    },

    score: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    currentQuestionIndex: {
  type: Number,
  default: 0,
},

isCompleted: {
  type: Boolean,
  default: false,
},

totalScore: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Interview",
  interviewSchema
);