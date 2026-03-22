import express from "express";
import pool from "../db.js";

const router = express.Router();

// POST new credit
router.post("/", async (req, res) => {
  const { customer_name, total_amount, invoice_items } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO credits (customer_name, total_amount, invoice_items) VALUES ($1, $2, $3) RETURNING *",
      [customer_name, total_amount, JSON.stringify(invoice_items)]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save credit" });
  }
});

// GET all credits
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, customer_name, total_amount, invoice_items::json, created_at FROM credits ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch credits" });
  }
});

export default router;