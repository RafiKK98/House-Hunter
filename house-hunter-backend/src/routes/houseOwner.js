const express = require('express');
const router = express.Router();
const houseOwnerController = require('../controllers/houseOwnerController');

router.get('/:userId/houses', houseOwnerController.getOwnedHouses);
router.post('/:userId/houses', houseOwnerController.addNewHouse);
router.put('/:userId/houses/:houseId', houseOwnerController.editHouse);
router.delete('/:userId/houses/:houseId', houseOwnerController.deleteHouse);

module.exports = router;
