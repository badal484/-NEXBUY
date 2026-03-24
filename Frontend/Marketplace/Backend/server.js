import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { createServer } from "http";


// ✅ Create HTTP server
const server = createServer(app);

// ✅ Connect Database
connectDB();

// ✅ Initialize Socket.io


// ✅ Start Server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});