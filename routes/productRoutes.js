// routes/productRoutes.js (UPDATED)
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidator = require('../middleware/productValidator'); // Import validator

// POST /products - Add product (Uses specific creation validation)
router.post(
    '/', 
    productValidator.validateProductCreation, // <-- Validation middleware runs first
    productController.addProduct
);

// GET /products - List all products
router.get('/', productController.listProducts);

// GET /products/:id - Get product by ID (NEW)
router.get('/:id', productController.getProductById);

// PATCH /products/:id - Update product (Name, Price, or Stock)
router.patch(
    '/:id', 
    productValidator.validateProductUpdate, // <-- Validation middleware runs first
    productController.updateProduct
);

// DELETE /products/:id - Delete product (NEW)
router.delete('/:id', productController.deleteProduct);

module.exports = router;