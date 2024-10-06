import { v4 as uuidv4 } from "uuid";
import AnswerModel from "../model/answer.js";

const GET_ANSWER_BY_QUESTION_ID = async (req, res) => {
  const { id } = req.params;
  try {
    const answers = await AnswerModel.find({ questionId: id });

    if (answers.length === 0) {
      return res
        .status(404)
        .json({ message: "No answers found for this question" });
    }

    res.status(200).json(answers); // Return the answers as a JSON response
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in application", error: error.message });
  }
};

const CREATE_ANSWER_BY_QUESTION_ID = async (req, res) => {
  const questionId = req.params.id;
  const answer = {
    id: uuidv4(),
    answerText: req.body.answerText,
    date: req.body.date,
    gainedLikesNumber: req.body.gainedLikesNumber || 0,
    gainedDislikesNumber: req.body.gainedDislikesNumber || 0,
    questionId: questionId,
  };
  try {
    const newAnswer = await new AnswerModel(answer);
    await newAnswer.save();

    return res
      .status(201)
      .json({ message: "answer was created", response: newAnswer });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in application" });
  }
};

const DELETE_ANSWER_BY_ID = async (req, res) => {
  const answerId = req.params.id;
  try {
    const deletedAnswer = await AnswerModel.findOneAndDelete({ id: answerId });

    if (!deletedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res
      .status(200)
      .json({ message: "Answer was deleted", answer: deletedAnswer });
  } catch (err) {
    console.log(err);

    
    return res.status(500).json({
      message: "error in application while deleting answer"
    });
  }
};


const LIKE_ANSWER_BY_ID = async (req, res) => {
  const answerId = req.params.id;
  try {
    const updatedAnswer = await AnswerModel.findOneAndUpdate(
      { id: answerId },
      { $inc: { gainedLikesNumber: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json({
      message: "Like added successfully",
      answer: updatedAnswer,
    });
  } catch (error) {
    console.error('Error liking answer:', error);
    return res.status(500).json({ message: "Error liking answer" });
  }
};

const DISLIKE_ANSWER_BY_ID = async (req, res) => {
  const answerId = req.params.id;
  try {
    const updatedAnswer = await AnswerModel.findOneAndUpdate(
      { id: answerId },
      { $inc: { gainedDislikesNumber: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedAnswer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    return res.status(200).json({
      message: "Dislike added successfully",
      answer: updatedAnswer,
    });
  } catch (error) {
    console.error('Error disliking answer:', error);
    return res.status(500).json({ message: "Error disliking answer" });
  }
}


export {
  GET_ANSWER_BY_QUESTION_ID,
  CREATE_ANSWER_BY_QUESTION_ID,
  DELETE_ANSWER_BY_ID,
  LIKE_ANSWER_BY_ID,
  DISLIKE_ANSWER_BY_ID,
};