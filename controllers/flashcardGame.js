const Food = require("../models/Food")
var path = require('path');

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/flashcard/flashcard.html'));
}


    const getFood =  (req, res) => {
        Food.aggregate([{ $sample: { size: 10 } }])
        .then((questions) => {
            console.log(questions)
            res.json(questions);
        })
        .catch((error) => {
            console.log(error);
            res.send('An error occured');
        });
    };

module.exports = {
    getStart,
    //getReady,
    getFood,
    // getPlay,
    // getResult,
};