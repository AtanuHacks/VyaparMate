import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    if (!mobile) {
      return res.status(400).json({ message: "Mobile required" });
    }

    // Check if user exists
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE mobile = $1",
      [mobile]
    );

    let user;

    if (userCheck.rows.length > 0) {
      user = userCheck.rows[0];
    } else {
      // Create new user
      const newUser = await pool.query(
        "INSERT INTO users (name, mobile) VALUES ($1, $2) RETURNING *",
        [name, mobile]
      );
      user = newUser.rows[0];
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};