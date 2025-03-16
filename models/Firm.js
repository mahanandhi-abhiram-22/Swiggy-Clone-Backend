const mongoose = require('mongoose');

const FirmSchema = new mongoose.Schema({
    firmname: { type: String, required: true },
    area: { type: String, required: true },
    category: { type: [String], required: true },  // Allow Array of Strings
    region: { type: [String], required: true },    // Allow Array of Strings
    offer: { type: String },
    image: { type: String },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }
    ,  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
    
});

module.exports = mongoose.model('Firm', FirmSchema);
