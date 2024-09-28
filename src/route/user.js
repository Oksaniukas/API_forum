import express from "express";

import { REGISTER_USER, LOGIN, VALIDATE_LOGIN } from "../controller/user.js";

const router = express.Router();

import auth from "../middleware/auth.js";

router.post("/users", REGISTER_USER);
router.post("/login", LOGIN);

router.get("/login/validate", auth, VALIDATE_LOGIN);

export default router;
