
const express = require('express');
const app = express();
const router = express.Router();


router.get('/', (req, res) => {
    res.render('../views/top/index.ejs');
});

router.get('/home', (req, res) => {
    res.render('../views/home/index.ejs');
});


module.exports = router;