const Food = require("../models/Food")
const User = require("../models/User")
const AddCard = require("../models/AddCard")

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        //const unixTime = new Date().getTime();
        const fileName = `${file.originalname}`
      cb(null, file.originalname)
    }
  })
  const upload = multer({storage});
var path = require('path');

const getfavoritePage = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/favorite.html'));
}

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashStart.html'));
}


const getFood =  (req, res) => {
    Food.find({}).sort({ _id: 1 }).exec((err, food) => {
        if (err) {
        console.log(err);
        res.status(500).send({ error: 'An error occurred' });
        }
        res.json(food);
    });
};
const getAddCard =  (req, res) => {
    AddCard.find({}).sort({ _id: 1 }).exec((err, addcard) => {
        if (err) {
        console.log(err);
        res.status(500).send({ error: 'An error occurred' });
        }
        res.json(addcard);
    });
};
const getPlay = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashcard.html'));
}

const addCardpage = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/addFlashcard.html'));
};

const addCard2 =
    //body('foodname').isLength({min: 1, max: 25 }).withMessage('食べ物名は１~25文字にしてください'),

    async(req, res) =>{

        try{
            //ユーザーの新規作成
            const add = await AddCard.create(req.body);
            const user = await User.findById(req.body.userId);
            console.log(user)
            const addId = add._id
            console.log(addId)
            await User.findByIdAndUpdate({_id : req.body.userId}, {$push: {addcards: addId}});
            res.send('カードを追加しました');

        }catch(err){
            return res.status(500).json(err);
        }
    };

//フラッシュカードの写真imageのアップロード
    const addImage =
        // //バリデーション　
        // body('foodname').isLength({min: 1, max: 25 }).withMessage('ユーザー名は１~25文字にしてください'),
        // body('iamge').isEmail().withMessage('正しいメールアドレスを入力してください'),
        // body('carbo').isLength({min: 5, max: 20 }).withMessage('パスワードは5~20文字にしてください'),

        //カードの追加
        async(req, res) =>{
            console.log("addImage")
            try{
                console.log(req.file);
                res.send('ファイルのアップロードが完了しました。');
        
            }catch(error){
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        };

    


const updateFavorite = async(req, res) => {
    console.log("test");
    try{
        const userId = req.body.userId;
        const foodId = req.body.foodId;

        //食べ物がまだ配列に存在しない場合に追加、あったら消す
        const user = await User.findById(userId);
        const update = user.favorites.includes(foodId)
        ? { $pull: { favorites: foodId } }
        : { $addToSet: { favorites: foodId } };

        await User.findByIdAndUpdate(userId, update);

        res.status(200);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getStartId = (req, res)=>{
    Food.findOne({}, '_id').sort({_id: 1}).exec((error, food)=>{
        if (error) {
            console.log(error);
            res.status(500).send({ error: 'An error occurred' });
        }
        res.json(food);
    })
}
const getOneFood = (req, res) => {
    const foodId = req.query.foodId;
    Food.findById(foodId).exec((error, food) => {
        if (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred' });
    }
        res.json(food);
    });
};

const getNextFood = async(req, res) =>{
    const foodId = req.query.foodId;
    const nextFood = await Food.findOne({ _id: { $gt: foodId } });
    if (!nextFood) {
        res.status(404).send('Next food not found');
        return;
    }
    res.status(200).send({ nextFoodId: nextFood._id });
}
const getPreviousFood = async(req, res) =>{
    const foodId = req.query.foodId;
    const previousFood = await Food.findOne({ _id: { $lt: foodId } }).sort({ _id: -1 });
    if (!previousFood) {
        res.status(404).send('Next food not found');
        return;
    }
    res.status(200).send({ previousFoodId: previousFood._id });
}



module.exports = {
    getfavoritePage,
    getStart,
    //getReady,
    getFood,
    getAddCard,
    getPlay,
    addCardpage,
    // getResult,
    addCard2,
    updateFavorite,
    addImage,
    getStartId,
    getOneFood,
    getNextFood,
    getPreviousFood
};