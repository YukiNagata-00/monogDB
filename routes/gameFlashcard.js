const express = require("express");
const router = express.Router();
const {
    getStart,
    getFood,
    getPlay,
} = require('../controllers/flashcardGame');



router.get('/start', getStart);
router.get('/getFood', getFood);
router.get('/play', getPlay);

module.exports = router;