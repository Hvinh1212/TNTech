// // routes/productRoutes.js

const express = require('express');
const router = express.Router();

const controllerBanner = require('../controllers/bannerController');


// Định nghĩa các API route
router.get('/banners', controllerBanner.getBanners);
router.post('/banners', controllerBanner.addBanners);
router.delete('/banners/:id', controllerBanner.removeBanner);


module.exports = router;
