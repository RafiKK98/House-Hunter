const express = require('express');
const router = express.Router();
const houseController = require('../controllers/houseController');

router.get('/', houseController.getAllHouses);
router.get('/:houseId', houseController.getHouseDetails);

module.exports = router;
