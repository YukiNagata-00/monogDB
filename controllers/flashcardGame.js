const Food = require("../models/Food")
var path = require('path');

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashcard.html'));
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

module.exports = {
    getStart,
    //getReady,
    getFood,
    // getPlay,
    // getResult,
};