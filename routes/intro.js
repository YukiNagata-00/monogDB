const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'html/intro.html'));
});


module.exports = router;

