const Food = require("../models/Food")
var path = require('path');

const getStart = (req, res, next) =>{
    res.sendFile(path.join(__dirname, '../public', 'html/select/selectStart.html'));
}
const getReady = (req, res, next) =>{

    try{
        Food.aggregate([
            { $sample: { size: 10 } }
        ], (err, foods) => {
            console.log(foods);
            res.redirect(`/game/select/playing?foods=${JSON.stringify(foods)}`);
        });
    }catch (err){
        console.log("failed")
    }


}
// const getPlaying = (req, res, next) =>{
//     const foods = req.query.foods;
//     res.render('quiz/select/playing.ejs');
// }
// const getPlaying = (req, res) => {
//     try{
//         Food.aggregate([
//             { $sample: { size: 10 } }
//         ], (err, foods) => {
//             console.log(foods);
//             res.json(foods);
//         });
//     }catch (err){
//         console.log("failed")
//     }
//   };
    const getPlay =  (req, res) => {
        Food.aggregate([{ $sample: { size: 10 } }])
        .then((questions) => {
            console.log(questions)
            res.json(questions);
            //res.render('play', { questions: questions });
            
        })
        .catch((error) => {
            console.log(error);
            res.send('An error occured');
        });
    };
    const getPlaying = (req, res, next) =>{
        res.sendFile(path.join(__dirname, '../public', 'html/select/selectPlay.html'));
    }
    const getResult = (req, res, next) =>{
        res.render('quiz/templates/result.ejs');
    }


module.exports = {
    getStart,
    getResult,
    getReady,
    getPlay,
    getPlaying,
};