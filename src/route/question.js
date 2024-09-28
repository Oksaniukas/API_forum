import express from "express";

import {
  GET_ALL_QUESTIONS,
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
} from "../controller/question.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", auth, GET_ALL_QUESTIONS);
router.post("/question", auth, CREATE_QUESTION);
router.delete("/question/:id", auth, DELETE_QUESTION_BY_ID);

export default router;
