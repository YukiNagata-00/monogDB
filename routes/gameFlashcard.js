const express = require("express");
const router = express.Router();
const {
    getStart,
    getFood,
    getPlay,
    addCardpage,
    addCard,
    updatefavorite
} = require('../controllers/flashcardGame');



router.get('/start', getStart);
router.get('/getFood', getFood);
router.get('/play', getPlay);
router.get('/addcard', addCardpage);
router.post('/addcard', addCard);
router.post('/updatefavorite',updatefavorite)

module.exports = router;