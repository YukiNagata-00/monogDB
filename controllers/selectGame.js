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
            res.send('An error occured');
        });
    };
    const getPlay = (req, res, next) =>{
        res.sendFile(path.join(__dirname, '../public', '/select/selectPlay.html'));
    }
    const getResult = (req, res, next) =>{
        res.sendFile(path.join(__dirname, '../public', '/html/gameResult.html'));
    }


module.exports = {
    getStart,
    //getReady,
    getFood,
    getPlay,
    getResult,
};