const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authMiddleware');

const {
    getGoals,
    createGoal,
    deleteGoal
} = require('../controllers/goalController');

/**
 * @swagger
 * tags:
 *   name: Goals
 *   description: Productivity goal management endpoints
 */

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Get current user's goals
 *     tags:
 *       - Goals
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Goals returned successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
router.get('/', authenticateToken, getGoals);

/**
 * @swagger
 * /api/goals:
 *   post:
 *     summary: Create a new productivity goal
 *     tags:
 *       - Goals
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - target_minutes
 *             properties:
 *               title:
 *                 type: string
 *                 example: Daily Social Media Limit
 *               target_minutes:
 *                 type: integer
 *                 example: 180
 *     responses:
 *       201:
 *         description: Goal created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
router.post('/', authenticateToken, createGoal);

/**
 * @swagger
 * /api/goals/{id}:
 *   delete:
 *     summary: Delete a productivity goal
 *     tags:
 *       - Goals
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Goal ID
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 *       404:
 *         description: Goal not found
 */
router.delete('/:id', authenticateToken, deleteGoal);

module.exports = router;