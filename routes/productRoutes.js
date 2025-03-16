const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// Add Product Route
router.post('/add-product/:firmId', productController.addProduct);

// Get Products by Firm
router.get('/:firmId/products', productController.getProductByFirm);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
})

router.delete('/:productId',productController.deleteProductById);

module.exports = router;
