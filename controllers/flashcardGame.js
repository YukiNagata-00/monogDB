//サーバーサイド
const Food = require("../models/Food")
const User = require("../models/User")

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
// const updates =(req, res, next) => {
//     const id = req.body.id;

//     User.findOneAndUpdate({id: req.body.id},
//         {$push:{favorites:Food.findById(id)}}
//     )
    
// }

module.exports = {
    getStart,
    //getReady,
    getFood,
    getPlay,
   // updates,
    // getResult,
};