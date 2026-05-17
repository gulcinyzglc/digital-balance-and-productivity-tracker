const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FocusFlow API',
            version: '1.0.0',
            description: 'Digital Balance & Productivity Tracker API'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: [
        './src/routes/usageRoutes.js',
        './src/routes/authRoutes.js'
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;