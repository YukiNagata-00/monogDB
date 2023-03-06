const express = require('express');
const app = express();
const router = express.Router();
var path = require('path');


const {
    updateUserInfo
} = require('../controllers/auth');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'auth/setting.html'));
});

router.post('/update-user-info', updateUserInfo);

module.exports = router;

