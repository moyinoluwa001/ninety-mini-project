const express = require('express');
const router = express.Router();
const pool = require('../db');
const { body, param, validationResult } = require('express-validator');

// CREATE
router.post(
  '/users',
  [body('name').notEmpty(), body('email').isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// READ ALL
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ by ID
router.get(
  '/users/:id',
  [param('id').isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// UPDATE
router.put(
  '/users/:id',
  [
    param('id').isInt(),
    body('name').notEmpty(),
    body('email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE
router.delete(
  '/users/:id',
  [param('id').isInt()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id } = req.params;
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
