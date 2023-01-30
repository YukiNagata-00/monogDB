const express = require("express");
const router = express.Router()


router.get('/start', (req, res) => {
    res.render('../views/quiz/templates/intro.ejs');
});
router.get('/playing', (req, res) => {
    res.render('../views/quiz/select/playing.ejs');
});
router.get('/result', (req, res) => {
    res.render('../views/quiz/templates/result.ejs');
});


module.exports = router;