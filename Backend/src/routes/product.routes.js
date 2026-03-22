import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { isSeller } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  addProduct,
  getNearbyProducts
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/protected", protect, (req, res) => {
  res.json({ msg: "Access granted", user: req.user });
});

router.post("/add", protect, isSeller, upload.single("image"), addProduct);

router.get("/nearby", getNearbyProducts);


export default router;

