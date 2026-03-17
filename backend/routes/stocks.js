import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET all stocks
router.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM stocks ORDER BY id DESC");
  res.json(data.rows);
});

// ADD item
router.post("/", async (req, res) => {
  const { name, price, quantity } = req.body;

  const newItem = await pool.query(
    "INSERT INTO stocks(name,price,quantity) VALUES($1,$2,$3) RETURNING *",
    [name, price, quantity]
  );

  res.json(newItem.rows[0]);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM stocks WHERE id=$1", [req.params.id]);
  res.json({ success: true });
});

// INCREASE
router.patch("/increase/:id", async (req, res) => {
  const item = await pool.query(
    "UPDATE stocks SET quantity = quantity + 1 WHERE id=$1 RETURNING *",
    [req.params.id]
  );

  res.json(item.rows[0]);
});

// DECREASE
router.patch("/decrease/:id", async (req, res) => {
  const item = await pool.query(
    "UPDATE stocks SET quantity = quantity - 1 WHERE id=$1 RETURNING *",
    [req.params.id]
  );

  res.json(item.rows[0]);
});

export default router;