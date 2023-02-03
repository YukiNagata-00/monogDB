const express = require("express");
const router = express.Router()
const {
    getStart,
    getReady,
    getPlaying,
    getResult
} = require('../controllers/selectGame')

router.get('/start', getStart);
router.get('/getReady', getReady);
router.get('/playing', getPlaying);
router.get('/result', getResult);


module.exports = router;