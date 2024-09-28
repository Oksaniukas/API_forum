import express from "express";

import {
  LOGIN,
  CREATE_COMPANY,
  GET_COMPANY_BY_ID,
  DELETE_COMPANY_BY_ID,
  VALIDATE_LOGIN,
} from "../controller/company.js";
import auth from "../middleware/auth.js"

const router = express.Router();

router.post("/companies", CREATE_COMPANY);
router.post("/login", LOGIN);
router.get("/login/validate", auth, VALIDATE_LOGIN);
router.get("/companies/:id", GET_COMPANY_BY_ID);
router.delete("/companies/:id", DELETE_COMPANY_BY_ID);

export default router;