import express from "express";

import {
  CREATE_INVENTORY,
  GET_COMPANY_INVENTORIES,
  GET_INVENTORY_BY_ID,
  DELETE_INVENTORY_BY_ID,
} from "../controller/inventory.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/inventories", auth, CREATE_INVENTORY);
router.get("/inventories/company", auth, GET_COMPANY_INVENTORIES);
router.get("/inventories/:id", auth, GET_INVENTORY_BY_ID);
router.delete("/inventories/:id", auth, DELETE_INVENTORY_BY_ID);

export default router;
