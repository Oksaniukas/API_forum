import { v4 as uuidv4 } from "uuid";
import QuestionModel from "../model/question.js";

const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await QuestionModel.find(); // Fetch all questions from the database

    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }

    res.status(200).json(questions); // Return the questions as a JSON response
  } catch (err) {
    res
      .status(500)
      .json({ message: "error in application", error: err.message });
  }
};

const CREATE_QUESTION = async (req, res) => {
  try {
    const question = {
      id: uuidv4(),
      questionText: req.body.questionText,
      date: req.body.date,
      userId: req.body.userId,
    };
    const newQuestion = await new QuestionModel(question);
    await newQuestion.save();

    return res
      .status(201)
      .json({ message: "question was created", response: newQuestion });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "error in application", error: err.message });
  }
};

const DELETE_QUESTION_BY_ID = async (req, res) => {
  const questionId = req.params.id;
  try {
    const deletedQuestion = await QuestionModel.findOneAndDelete ({ id: questionId });

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.status(200).json({ message: "Question was deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "error in application while deleting question",
      error: err.message,
    });
  }
};

export { GET_ALL_QUESTIONS, CREATE_QUESTION, DELETE_QUESTION_BY_ID };
