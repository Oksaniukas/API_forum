import express from "express";

import {
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  CREATE_QUESTION,
  DELETE_QUESTION_BY_ID,
  GET_QUESTIONS_BY_USER_ID,
} from "../controller/question.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", GET_ALL_QUESTIONS);
router.get("/question/:id", GET_QUESTION_BY_ID);
router.get("/questions/user",auth,  GET_QUESTIONS_BY_USER_ID);
router.post("/question", auth, CREATE_QUESTION);
router.delete("/question/:id", auth, DELETE_QUESTION_BY_ID);

export default router;
