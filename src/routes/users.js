const express = require('express');
const router = express.Router();
const  { userController } = require('../controllers')


router.get('/getCoinsTicks', userController.getCoinsTicks);
router.get('/getCoinsTicks/hourly', userController.getCoinsTicksHourly);

module.exports = router;
