const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/foods')
    },
    filename: function (req, file, cb) {
        const unixTime = new Date().getTime();
        // const fileName = `${unixTime}_${file.originalname}`
        const fileName = `${file.originalname}`
      cb(null, fileName)
    }
  })
  const upload = multer({storage});
const router = express.Router();
const {
    getfavoritePage,
    getaddshowpage,
    getStart,
    getFood,
    getPlay,
    getAddCard,
    addCardpage,
    addCard2,
    updateFavorite,
    addImage,
    getStartId,
    getOneFood,
    getNextFood,
    getPreviousFood,
  //  getAllFood
} = require('../controllers/flashcardGame');
router.get('/favorite', getfavoritePage)
router.get('/adds', getaddshowpage)
router.get('/getStartId', getStartId)
router.get('/getNextFood', getNextFood)
router.get('/getOneFood', getOneFood)
router.get('/getPreviousFood', getPreviousFood)
router.get('/start', getStart);
router.get('/getFood', getFood);
router.get('/play', getPlay);
router.get('/getAddCard', getAddCard);
router.get('/addcard', addCardpage);
router.post('/addcard2', addCard2);
router.post('/updateFavorite',updateFavorite)
router.post('/addImage', upload.single("image"), addImage);
//router.post('/allfood',getALLFood)

module.exports = router;