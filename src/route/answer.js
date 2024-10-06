import express from "express";

import {
  GET_ANSWER_BY_QUESTION_ID,
  CREATE_ANSWER_BY_QUESTION_ID,
  DELETE_ANSWER_BY_ID,
  LIKE_ANSWER_BY_ID,
  DISLIKE_ANSWER_BY_ID,
} from "../controller/answer.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/question/:id/answers",  GET_ANSWER_BY_QUESTION_ID);
router.post("/question/:id/answers", auth, CREATE_ANSWER_BY_QUESTION_ID);
router.post('/answer/:id/like', LIKE_ANSWER_BY_ID);
router.post('/answer/:id/dislike', DISLIKE_ANSWER_BY_ID);
router.delete("/answer/:id", auth, DELETE_ANSWER_BY_ID);

export default router;