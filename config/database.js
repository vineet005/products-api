// config/database.js
const { Sequelize } = require('sequelize');

// --- Configuration for MSSQL (Uncomment and configure if needed) ---
/*
const sequelize = new Sequelize(
    process.env.MSSQL_DB,
    process.env.MSSQL_USER,
    process.env.MSSQL_PASSWORD,
    {
        host: process.env.MSSQL_HOST,
        dialect: 'mssql',
        port: process.env.MSSQL_PORT || 1433,
        logging: false,
        dialectOptions: {
            // Options required for connecting to MSSQL
            options: {
                encrypt: process.env.MSSQL_ENCRYPT === 'true', // Use 'true' if connecting to Azure/modern SQL Server
                trustServerCertificate: process.env.MSSQL_TRUST_CERT === 'true', // Required for self-signed certs
            },
        },
    }
);
*/

// --- Configuration for SQLite (Default for this runnable example) ---
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/products.sqlite', // ':memory:' means the database is temporary
    logging: false,
});

module.exports = sequelize;