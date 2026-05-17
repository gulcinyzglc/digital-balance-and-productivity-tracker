/**
 * @swagger
 * /api/usage:
 *   get:
 *     summary: Get all usage records
 *     responses:
 *       200:
 *         description: Success
 *
 *   post:
 *     summary: Create a usage record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               app_name:
 *                 type: string
 *               category:
 *                 type: string
 *               duration:
 *                 type: integer
 *               usage_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Record created
 *
 * /api/usage/{id}:
 *   put:
 *     summary: Update a usage record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               app_name:
 *                 type: string
 *               category:
 *                 type: string
 *               duration:
 *                 type: integer
 *               usage_date:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 *
 *   delete:
 *     summary: Delete a usage record
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted
  */


const express = require('express');
const router = express.Router();
const db = require('../db/database');

/**
 * GET all usage records
 */
router.get('/', (req, res) => {
    db.all('SELECT * FROM usage_records', [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

/**
 * CREATE usage record
 */
router.post('/', (req, res) => {
    const { app_name, category, duration, usage_date } = req.body;

    if (!app_name || !category || !duration || !usage_date) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const query = `
        INSERT INTO usage_records
        (app_name, category, duration, usage_date)
        VALUES (?, ?, ?, ?)
    `;

    db.run(
        query,
        [app_name, category, duration, usage_date],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: 'Usage record created',
                id: this.lastID
            });
        }
    );
});

/**
 * UPDATE usage record
 */
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { app_name, category, duration, usage_date } = req.body;

    if (!app_name || !category || !duration || !usage_date) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const query = `
        UPDATE usage_records
        SET app_name = ?, category = ?, duration = ?, usage_date = ?
        WHERE id = ?
    `;

    db.run(
        query,
        [app_name, category, duration, usage_date, id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: 'Usage record not found'
                });
            }

            res.json({
                message: 'Usage record updated'
            });
        }
    );
});

/**
 * DELETE usage record
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM usage_records WHERE id = ?',
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: 'Usage record not found'
                });
            }

            res.json({
                message: 'Usage record deleted'
            });
        }
    );
});

module.exports = router;
