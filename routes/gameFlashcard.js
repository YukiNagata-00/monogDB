const express = require("express");
const router = express.Router();
const {
    getStart,
    getFood,
    getPlay,
    getAddCard,
    addCardpage,
    addCard,
    updatefavorite
} = require('../controllers/flashcardGame');



router.get('/start', getStart);
router.get('/getFood', getFood);
router.get('/play', getPlay);
router.get('/getAddCard', getAddCard);
router.get('/addcard', addCardpage);
router.post('/addcard2', addCard);
router.post('/updatefavorite',updatefavorite)

module.exports = router;