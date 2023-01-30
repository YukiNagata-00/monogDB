const express = require("express");
const router = express.Router()
const {
    getFoods, 
    getStart,
    getResult
} = require('../controllers/selectGame')

router.get('/start', getStart);
router.get('/playing', getFoods);
router.get('/result', getResult);


module.exports = router;