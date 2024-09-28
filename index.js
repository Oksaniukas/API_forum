import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";

import inventoriesRouter from "./src/route/inventory.js";
import companiesRouter from "./src/route/company.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("connected to DB successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(inventoriesRouter);
app.use(companiesRouter);


app.use((req, res) => {
  return res.status(404).json({ message: "this endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Your application was launched successfully on port ${process.env.PORT}`
  );
});
