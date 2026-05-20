const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authMiddleware');

const {
    getStats
} = require('../controllers/statsController');

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: Productivity statistics and analytics endpoints
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get current user's productivity statistics
 *     tags:
 *       - Statistics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistics returned successfully
 *       401:
 *         description: Access token required
 *       403:
 *         description: Invalid or expired token
 */
router.get('/', authenticateToken, getStats);

module.exports = router;