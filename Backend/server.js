import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { createServer } from "http";



const server = createServer(app);

connectDB();

const PORT = process.env.PORT || 5004;

server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});