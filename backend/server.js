import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pkg from "pg";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Neon connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// ==============================
// CREATE USERS TABLE (Auto)
// ==============================
const createUsersTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      mobile VARCHAR(15) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("Users table ready");
};

createUsersTable();


// ==============================
// TEST ROUTE
// ==============================
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Neon connected",
      time: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==============================
// LOGIN / REGISTER API
// ==============================
app.post("/api/auth/login", async (req, res) => {
  const { name, mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile is required" });
  }

  try {
    // Check if user exists
    let userResult = await pool.query(
      "SELECT * FROM users WHERE mobile = $1",
      [mobile]
    );

    let user;

    if (userResult.rows.length === 0) {
      // Create new user
      const newUser = await pool.query(
        "INSERT INTO users (name, mobile) VALUES ($1, $2) RETURNING *",
        [name, mobile]
      );
      user = newUser.rows[0];
    } else {
      user = userResult.rows[0];
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ==============================
// PROTECTED ROUTE (Check Login)
// ==============================
app.get("/api/auth/me", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userResult = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [decoded.userId]
    );

    res.json(userResult.rows[0]);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});