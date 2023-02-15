const express = require("express");
const router = express.Router()
const {
    getStart,
    // getReady,
    getFood,
    getPlay,
    getResult
} = require('../controllers/compareGame')

/*
ex)
router.get('/start', getStart);
-> url /game/select/start の時、controllers/selectGame.jsの "getStart"の処理をする。
*/

router.get('/start', getStart);
//router.get('/getReady', getReady);
router.get('/getFood', getFood);
router.get('/play', getPlay);
router.get('/result', getResult);


module.exports = router;
