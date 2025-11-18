// index.js (UPDATED)
require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express'); // Import Swagger UI
const YAML = require('yamljs'); // Import YAML parser
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');

// Load the Swagger definition
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// --- SWAGGER/OPENAPI DOCUMENTATION ROUTE ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Routes
app.use('/products', productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Something broke!' });
});

// Server Startup Function
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        await sequelize.sync(); 
        console.log('Database schema synchronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            // New console log for the documentation URL
            console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`); 
        });
    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
};

startServer();