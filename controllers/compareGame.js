const Food = require("../models/Food")
var path = require('path');

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/compare/compareStart.html'));
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
    const getPlay = (req, res, next) =>{
        res.sendFile(path.join(__dirname, '../public', '/compare/comparePlay.html'));
    }
    const getResult = (req, res, next) =>{
        res.render('quiz/templates/result.ejs');
    }


module.exports = {
    getStart,
    getFood,
    getPlay,
    getResult,
};