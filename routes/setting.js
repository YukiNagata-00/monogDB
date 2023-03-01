const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');


// const {

// } = require('../controllers/setting');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/setting.html'));
});


module.exports = router;

