const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authMiddleware');

const {
    getUsages,
    createUsage,
    updateUsage,
    deleteUsage
} = require('../controllers/usageController');

/**
 * @swagger
 * tags:
 *   name: Usage Records
 *   description: User-specific digital usage tracking endpoints
 */

/**
 * @swagger
 * /api/usage:
 *   get:
 *     summary: Get current user's usage records
 *     tags:
 *       - Usage Records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usage records returned successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
router.get('/', authenticateToken, getUsages);

/**
 * @swagger
 * /api/usage:
 *   post:
 *     summary: Create a new usage record
 *     tags:
 *       - Usage Records
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - app_name
 *               - category
 *               - duration
 *               - usage_date
 *             properties:
 *               app_name:
 *                 type: string
 *                 example: Instagram
 *               category:
 *                 type: string
 *                 example: Social Media
 *               duration:
 *                 type: integer
 *                 example: 120
 *               usage_date:
 *                 type: string
 *                 example: 2026-05-20
 *     responses:
 *       201:
 *         description: Usage record created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
router.post('/', authenticateToken, createUsage);

/**
 * @swagger
 * /api/usage/{id}:
 *   put:
 *     summary: Update a usage record
 *     tags:
 *       - Usage Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Usage record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - app_name
 *               - category
 *               - duration
 *               - usage_date
 *             properties:
 *               app_name:
 *                 type: string
 *                 example: YouTube
 *               category:
 *                 type: string
 *                 example: Study
 *               duration:
 *                 type: integer
 *                 example: 90
 *               usage_date:
 *                 type: string
 *                 example: 2026-05-20
 *     responses:
 *       200:
 *         description: Usage record updated successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Usage record not found
 */
router.put('/:id', authenticateToken, updateUsage);

/**
 * @swagger
 * /api/usage/{id}:
 *   delete:
 *     summary: Delete a usage record
 *     tags:
 *       - Usage Records
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Usage record ID
 *     responses:
 *       200:
 *         description: Usage record deleted successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Usage record not found
 */
router.delete('/:id', authenticateToken, deleteUsage);

module.exports = router;