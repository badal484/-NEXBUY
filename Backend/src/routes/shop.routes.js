import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isSeller } from "../middleware/role.middleware.js";
import { createShop, getMyShop } from "../controllers/shop.controller.js";

const router = express.Router();

router.post("/create", protect, isSeller, createShop);

router.get("/my", protect, isSeller, getMyShop);

export default router;
