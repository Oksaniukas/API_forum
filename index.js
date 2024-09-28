import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import answersRouter from "./src/route/answer.js";
import questionsRouter from "./src/route/question.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("connected to DB successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(answersRouter);
app.use(questionsRouter);


app.use((req, res) => {
  return res.status(404).json({ message: "this endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Your application was launched successfully on port ${process.env.PORT}`
  );
});
