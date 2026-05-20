const db = require('../db/database');
const { calculateStats } = require('../services/statsService');

exports.getStats = (req, res) => {
    db.all(
        'SELECT * FROM usage_records WHERE user_id = ?',
        [req.user.id],
        (err, rows) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            const productiveCategories = [
                'Work',
                'Education',
                'Study',
                'Coding',
                'Productivity',
                'Research',
                'Reading',
                'Design'
            ];

            const usageData = rows.map(item => ({
                appName: item.app_name,
                category: item.category,
                type: productiveCategories.includes(item.category)
                    ? 'productive'
                    : 'unproductive',
                duration: item.duration
            }));

            const stats = calculateStats(usageData);

            res.json(stats);
        }
    );
};