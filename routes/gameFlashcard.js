const express = require("express");
const router = express.Router()
const {
    getStart,
} = require('../controllers/flashcardGame');



router.get('/', getStart);


module.exports = router;