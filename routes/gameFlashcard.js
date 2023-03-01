const express = require("express");
const router = express.Router();
const {
    getStart,
    getFood,
    getPlay,
  //  updates,
} = require('../controllers/flashcardGame');


//router.post('/update',updates)
router.get('/start', getStart);
router.get('/getFood', getFood);
router.get('/play', getPlay);

module.exports = router;