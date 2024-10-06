import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
  id: { type: String, required: true },
  answerText: { type: String, required: true },
  date: { type: Date, required: true , default: Date.now},
  gainedLikesNumber: { type: Number, required: true, default:0 },
  gainedDislikesNumber: { type: Number, required: true, default:0 },
  questionId: { type: String, required: true },
});

export default mongoose.model("Answer", answerSchema);