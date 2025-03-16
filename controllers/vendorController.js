const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.WhatIsYourName; // ✅ Using WhatIsYourName from .env

// ✅ Vendor Registration
const VendorRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const vendorExists = await Vendor.findOne({ email });
        if (vendorExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({ name, email, password: hashedPassword });

        await newVendor.save();
        res.status(201).json({ message: 'Vendor registered successfully' });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ✅ Vendor Login
const VendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login Attempt:", email);

        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
            return res.status(401).json({ error: 'Vendor not found' });
        }

        console.log("Vendor Found:", vendor.email);

        const isPasswordValid = await bcrypt.compare(password, vendor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        console.log("Password Matched!");

        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Vendor logged in successfully', token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ✅ Get All Vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find().populate('firms');
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// ✅ Get Vendor by ID
const getVendorById = async (req, res) => {
    const vendorId = req.params.id;
    try {
        const vendor = await Vendor.findById(vendorId).populate('firms');
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        console.error("Vendor Fetch Error:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { VendorRegister, VendorLogin, getAllVendors, getVendorById };
