const express = require("express");
const router = express.Router();
const {
    getStart,
    getFood,
    getPlay,
     //  updates,
} = require('../controllers/flashcardGame');



router.get('/start', getStart);
router.get('/getFood', getFood);
router.get('/play', getPlay);
//router.post('/update',updates)

module.exports = router;