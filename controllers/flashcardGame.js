const Food = require("../models/Food")
const User = require("../models/User")
const AddCard = require("../models/AddCard")
var path = require('path');

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
const getPlay = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashcard.html'));
}

const addCardpage = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/addFlashcard.html'));
};
// const addCard = ()

// const updatefavorite = async(req, res) => {
//     try{
//         const id = req.body.id;
//         const foodid = req.food.id;
//         const user = await User.findById(id);
//         console.log(user);

//         User.findOneAndUpdate({id: req.body.id},
//             {$push:{favorites:Food.findById(id)}}
//         )
//         await User.save();
//         res.status(200);

//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
   

// }

module.exports = {
    getStart,
    //getReady,
    getFood,
    getPlay,
    addCardpage,
    // getResult,
    // addCard,

    
    //updatefavorite,
};