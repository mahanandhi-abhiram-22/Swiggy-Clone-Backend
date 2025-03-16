const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure 'uploads/' folder exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

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

const addFirm = async (req, res) => {
    try {
        let { firmname, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        // Convert category and region arrays to comma-separated strings
        if (Array.isArray(category)) {
            category = category.join(', '); 
        }
        if (Array.isArray(region)) {
            region = region.join(', ');
        }

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        const firm = new Firm({
            firmname,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();

        // Ensure 'firms' array exists before pushing
        if (!Array.isArray(vendor.firms)) {
            vendor.firms = []; // Initialize as empty array
        }

        vendor.firms.push(savedFirm._id);
        await vendor.save();

        res.status(200).json({ message: 'Firm added successfully', firm: savedFirm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete Firm by ID
const deleteFirmById = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if (!deletedFirm) {
            return res.status(404).json({ error: 'Firm not found' });
        }

        res.status(200).json({ message: 'Firm deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { 
    addFirm: [upload.single('image'), addFirm],
    deleteFirmById
};
