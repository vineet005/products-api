// middleware/productValidator.js

/**
 * Middleware to validate input for POST /products
 */
exports.validateProductCreation = (req, res, next) => {
    const { name, price, stock } = req.body;

    // Check for missing fields
    if (!name || price === undefined || stock === undefined) {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation Error: Missing required fields (name, price, stock).' 
        });
    }

    // Check data types and business logic constraints
    if (typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation Error: Name must be a string of at least 2 characters.' 
        });
    }

    if (isNaN(price) || price < 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation Error: Price must be a non-negative number.' 
        });
    }

    if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation Error: Stock must be a non-negative integer.' 
        });
    }

    // Sanitize input
    req.body.name = name.trim();
    req.body.price = parseFloat(price);
    req.body.stock = parseInt(stock, 10);

    next();
};

/**
 * Middleware to validate input for PATCH /products/:id (General Update)
 */
exports.validateProductUpdate = (req, res, next) => {
    const { name, price, stock } = req.body;
    let updateFields = 0;

    if (name !== undefined) {
        if (typeof name !== 'string' || name.trim().length < 2) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation Error: Name, if provided, must be a string of at least 2 characters.' 
            });
        }
        req.body.name = name.trim();
        updateFields++;
    }

    if (price !== undefined) {
        if (isNaN(price) || price < 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation Error: Price, if provided, must be a non-negative number.' 
            });
        }
        req.body.price = parseFloat(price);
        updateFields++;
    }

    if (stock !== undefined) {
        if (isNaN(stock) || !Number.isInteger(stock) || stock < 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation Error: Stock, if provided, must be a non-negative integer.' 
            });
        }
        req.body.stock = parseInt(stock, 10);
        updateFields++;
    }
    
    // Edge Case: Ensure at least one field is being updated
    if (updateFields === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Validation Error: At least one field (name, price, or stock) must be provided for update.' 
        });
    }

    next();
};