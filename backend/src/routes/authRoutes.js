const express = require('express');
const router = express.Router();
const db = require('../db/database');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const query = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `;

    db.run(query, [username, email, password], function (err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: 'User registered successfully',
            id: this.lastID
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: 'Email and password are required'
        });
    }

    const query = `
        SELECT * FROM users
        WHERE email = ? AND password = ?
    `;

    db.get(query, [email, password], (err, user) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    });
});

module.exports = router;