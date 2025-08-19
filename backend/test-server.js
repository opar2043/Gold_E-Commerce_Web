import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Test server is running 🚀");
});

// Simple cart route without database
app.get("/api/cart/test", (req, res) => {
  res.json({ message: "Cart API test successful", sessionId: "test-123" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Test server running on port ${PORT}`));
