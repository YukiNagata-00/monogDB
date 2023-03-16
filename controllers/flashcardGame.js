const Food = require("../models/Food")
const User = require("../models/User")
const AddCard = require("../models/AddCard")

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/addcards/')
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

//カードを追加するページへの移動
const addCardpage = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/addFlashcard.html'));
};

const addCard2 =
   
    async(req, res) =>{

        try{
            const add = await AddCard.create(req.body);
            const user = await User.findById(req.body.usernoId);
            console.log(user)
            console.log(add)
            const addId = add._id
            console.log(addId)
            await User.findByIdAndUpdate({_id : req.body.usernoId}, {$push: {addcards: addId}});
            res.send(add);

        }catch(err){
            return res.status(500).json(err);
        }
    };

//フラッシュカードの写真imageのアップロード
    const addImage =
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



//基本カードのidのみ
const getStartId = (req, res)=>{
    Food.findOne({username:"all"}).sort({_id: 1}).exec((error, food)=>{
        if (error) {
            console.log(error);
            res.status(500).send({ error: 'An error occurred' });
        }
        res.json(food);
    })
}
const getOneFood = (req, res) => {
    const foodId = req.query.foodId;
    console.log(foodId);
  
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
    const nextFood = await Food.findOne({username:"all", _id: { $gt: foodId } });
    if (!nextFood) {
        res.status(404).send('Next food not found');
        return;
    }
    res.status(200).send({ nextFoodId: nextFood._id , nextUsername: nextFood.username});
}
const getPreviousFood = async(req, res) =>{
    const foodId = req.query.foodId;
    const previousFood = await Food.findOne({username: "all", _id: { $lt: foodId } }).sort({ _id: -1 });
    if (!previousFood) {
        res.status(404).send('Next food not found');
        return;
    }
    res.status(200).send({ previousFoodId: previousFood._id ,previousUsername: previousFood.username});
}
//追加カードを表示させるページへの移動
const getaddshowpage = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/addshow.html'));
}
//追加カードのIDを探して、データを取って来る
const getOneAddFood = (req, res) => {
    const foodId = req.query.foodId;
    AddCard.findById(foodId).exec((error, food) => {
        if (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred' });
    }
        res.json(food);
    });
};


module.exports = {
    getfavoritePage,
    getaddshowpage,
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
    getPreviousFood,
    getOneAddFood
};