const express = require("express");
const router = express.Router();
const {
    getStart,
    getFood,
} = require('../controllers/flashcardGame');



router.get('/', getStart);
router.get('/getFood', getFood);

module.exports = router;