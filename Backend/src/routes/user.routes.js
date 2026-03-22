import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { becomeSeller } from "../controllers/user.controller.js";

const router = express.Router();

router.patch("/become-seller", protect, becomeSeller);

export default router;

