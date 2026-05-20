require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

require('./src/db/database');

const authRoutes = require('./src/routes/authRoutes');
const usageRoutes = require('./src/routes/usageRoutes');
const goalRoutes = require('./src/routes/goalRoutes');
const statsRoutes = require('./src/routes/statsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Digital Balance & Productivity Tracker API is running'
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/stats', statsRoutes);

app.get('/swagger.json', (req, res) => {
    res.json(swaggerSpec);
});

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(
    '/api-docs',
    swaggerUi.serveFiles(swaggerSpec),
    swaggerUi.setup(swaggerSpec, {
        explorer: true,
        swaggerOptions: {
            persistAuthorization: true,
            displayRequestDuration: true
        }
    })
);

module.exports = app;