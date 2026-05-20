const db = require('../db/database');

exports.getUsages = (req, res) => {
    db.all(
        'SELECT * FROM usage_records WHERE user_id = ?',
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

exports.createUsage = (req, res) => {
    const { app_name, category, duration, usage_date } = req.body;

    if (!app_name || !category || !duration || !usage_date) {
        return res.status(400).json({
            error: 'All fields are required'
        });
    }

    const query = `
        INSERT INTO usage_records
        (user_id, app_name, category, duration, usage_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [req.user.id, app_name, category, duration, usage_date],
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
};

exports.updateUsage = (req, res) => {
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
        WHERE id = ? AND user_id = ?
    `;

    db.run(
        query,
        [app_name, category, duration, usage_date, id, req.user.id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: 'Usage record not found or not authorized'
                });
            }

            res.json({
                message: 'Usage record updated'
            });
        }
    );
};

exports.deleteUsage = (req, res) => {
    const { id } = req.params;

    db.run(
        'DELETE FROM usage_records WHERE id = ? AND user_id = ?',
        [id, req.user.id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: 'Usage record not found or not authorized'
                });
            }

            res.json({
                message: 'Usage record deleted'
            });
        }
    );
};