const db = require('../db/database');

exports.getGoals = (req, res) => {
    db.all(
        'SELECT * FROM goals WHERE user_id = ?',
        [req.user.id],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );
};

exports.createGoal = (req, res) => {
    const { title, target_minutes } = req.body;

    if (!title || !target_minutes) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const query = `
        INSERT INTO goals
        (user_id, title, target_minutes)
        VALUES (?, ?, ?)
    `;

    db.run(
        query,
        [req.user.id, title, target_minutes],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: 'Goal created successfully',
                id: this.lastID
            });
        }
    );
};

exports.deleteGoal = (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM goals WHERE id = ? AND user_id = ?',
        [id, req.user.id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: 'Goal not found or unauthorized'
                });
            }

            res.json({
                message: 'Goal deleted successfully'
            });
        }
    );
};