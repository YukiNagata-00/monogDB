
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/top/index.ejs');
});

router.get('/home', (req, res) => {
    res.render('../views/home/index.ejs');
});

router.get('/game/select', (req, res) => {
    res.render('../views/quiz/templates/intro.ejs');
});
router.get('/game/select/playing', (req, res) => {
    res.render('../views/quiz/select/playing.ejs');
});
router.get('/game/select/result', (req, res) => {
    res.render('../views/quiz/templates/result.ejs');
});

// router.get('/login', (req, res) => {
//     res.render('../views/auth/login.ejs');
// });
module.exports = router;