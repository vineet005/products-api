// controllers/productController.js (UPDATED)
const Product = require('../models/Product');

// Helper for standardized error handling
const handleSequelizeError = (res, error) => {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errorMessage = error.errors.map(e => e.message).join(', ');
        // 409 Conflict is often better for unique constraint errors
        const status = error.name === 'SequelizeUniqueConstraintError' ? 409 : 400; 
        return res.status(status).json({ success: false, message: `Database Error: ${errorMessage}` });
    }
    console.error("Database Error:", error);
    return res.status(500).json({ success: false, message: 'Internal Server Error: Could not process request.' });
};

// 1. POST /products — Add Product
exports.addProduct = async (req, res) => {
    const { name, price, stock } = req.body; // Input already validated by middleware

    try {
        const newProduct = await Product.create({ name, price, stock });

        res.status(201).json({ // 201 Created
            success: true,
            message: 'Product added successfully.',
            product: newProduct,
        });
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// 2. GET /products — List Products
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'price', 'stock', 'createdAt', 'updatedAt']
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error: Could not retrieve products.' });
    }
};

// 3. GET /products/:id — Get Product by ID (NEW)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: `Product with ID ${req.params.id} not found.` 
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error: Could not retrieve product.' });
    }
};

// 4. PATCH /products/:id — Update Product (Replaces updateStock)
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    // req.body contains the validated fields (name, price, or stock)
    const updateData = req.body; 

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ 
                success: false, 
                message: `Product with ID ${id} not found.` 
            });
        }

        // Apply all updates from the validated body
        // Sequelize's update method automatically merges new data
        const updatedProduct = await product.update(updateData); 

        res.status(200).json({
            success: true,
            message: `Product ID ${id} updated successfully.`,
            product: updatedProduct,
        });
    } catch (error) {
        // Handles unique constraint or validation errors
        handleSequelizeError(res, error); 
    }
};

// 5. DELETE /products/:id — Delete Product (NEW)
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await Product.destroy({
            where: { id: id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ 
                success: false, 
                message: `Product with ID ${id} not found for deletion.` 
            });
        }

        // 204 No Content is the standard response for a successful DELETE
        res.status(204).send(); 
        
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error: Could not delete product.' });
    }
};