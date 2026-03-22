import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all transactions
router.get("/", async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT * FROM transactions ORDER BY created_at DESC"
    );
    res.json(data.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { amount, method } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO transactions (amount, method) VALUES ($1, $2) RETURNING *",
      [amount, method || "UPI"]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save transaction" });
  }
});

export default router;