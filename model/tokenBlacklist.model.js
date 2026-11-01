import mongoose from "mongoose";

const tokenBlacklistSchema = new mongoose.Schema({
  jti: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

tokenBlacklistSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  },
);

const tokenBlacklist = mongoose.model("TokenBlacklist", tokenBlacklistSchema);

export default tokenBlacklist;
