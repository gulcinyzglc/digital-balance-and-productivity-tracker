const db = require('../db/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) {

            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users
            (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.run(
            query,
            [username, email, hashedPassword],
            function (err) {

                if (err) {

                    return res.status(500).json({
                        error:
                        'Email already exists or database error'
                    });
                }

                return res.status(201).json({
                    message:
                    'User registered successfully',
                    id: this.lastID
                });
            }
        );

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });
    }
};

exports.login = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            error:
            'Email and password are required'
        });
    }

    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],

        async (err, user) => {

            try {

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

                const isMatch =
                    await bcrypt.compare(
                        password,
                        user.password
                    );

                if (!isMatch) {

                    return res.status(401).json({
                        error: 'Invalid credentials'
                    });
                }

                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email
                    },

                    process.env.JWT_SECRET,

                    {
                        expiresIn: '1h'
                    }
                );

                return res.json({
                    message: 'Login successful',

                    token,

                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });

            } catch (error) {

                return res.status(500).json({
                    error: error.message
                });
            }
        }
    );
};