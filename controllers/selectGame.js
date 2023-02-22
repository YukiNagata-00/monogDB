const Food = require("../models/Food")
var path = require('path');

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', '/select/selectStart.html'));
}
//多分使わない？
// const getReady = (req, res, next) =>{

//     try{
//         Food.aggregate([
//             { $sample: { size: 10 } }
//         ], (err, foods) => {
//             console.log(foods);
//             res.redirect(`/game/select/playing?foods=${JSON.stringify(foods)}`);
//         });
//     }catch (err){
//         console.log("failed")
//     }
// }

    const getFood =  (req, res) => {
        Food.aggregate([{ $sample: { size: 10 } }])
        .then((questions) => {
            console.log(questions)
            res.json(questions);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
    };
    const getPlay = (req, res, next) =>{
        res.sendFile(path.join(__dirname, '../public', '/select/selectPlay.html'));
    }
    const postScore=(req, res)=>{
        score = req.body.score;
        res.sendStatus(200);
    }
    const getScore=(req, res)=>{
        res.send({ score: score });
    }
    const getResult = (req, res) =>{
        res.sendFile(path.join(__dirname, '../public', '/html/gameResult.html'));
    }


module.exports = {
    getStart,
    //getReady,
    getFood,
    getPlay,
    postScore,
    getScore,
    getResult,
};