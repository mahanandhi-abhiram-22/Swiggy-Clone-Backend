const Product = require('../models/Product');
const Firm = require('../models/Firm');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Add Product Controller
const addProduct = async (req, res) => {
    try {
        let { productName, price, category, bestSeller, description } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Convert category to match enum values
        if (Array.isArray(category)) {
            category = category.map(cat => cat.toLowerCase()); // Convert input to lowercase
        }

        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: 'Firm not found' });
        }

        const product = new Product({
            productName,
            price,
            category,
            image,
            bestSeller,
            description,
            firm: firm._id
        });

        const savedProduct = await product.save();
        firm.products.push(savedProduct);
        await firm.save();

        res.status(200).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Products by Firm ID (with Restaurant Name)
const getProductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        
        // Populate firm data along with products
        const firm = await Firm.findById(firmId).populate('products');
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        res.status(200).json({
            restaurantName: firm.firmname, // Ensure this matches the field in your schema
            products: firm.products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete Product by ID
const deleteProductById = async (req, res) => { 
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addProduct: [upload.single('image'), addProduct],
    getProductByFirm,
    deleteProductById
};
