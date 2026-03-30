import express from "express";
import cors from "cors";
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";
import shopRoutes from "./routes/shop.routes.js"; 
import productRoutes from "./routes/product.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
// Add this before your app.listen()
app.get('/', (req, res) => {
  res.status(200).send("Backend is live and running!");
});

export default app;