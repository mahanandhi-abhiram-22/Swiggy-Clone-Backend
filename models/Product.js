const mongoose = require('mongoose');
const Firm = require('./Firm'); // Ensure Firm model exists

const productSchema = new mongoose.Schema({
    productName: { 
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: [{
            type: String,
            enum: ['veg', 'non-veg']  // Fixed: Ensure lowercase 'non-veg' for consistency
        }]
    },
    image: {
        type: String,
    },
    bestSeller: {
        type: String,
    },
    description: {
        type: String,
    },
    firm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Firm',
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
