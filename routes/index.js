
const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');

/* GET index page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'html/index.html'));
});

/* GET home page. */
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html/home.html'));
});


module.exports = router;