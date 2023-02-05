const Food = require("../models/Food")


const getStart = (req, res, next) =>{
    res.render('quiz/templates/intro.ejs');
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
const getPlaying = (req, res, next) =>{
    const foods = req.query.foods;
    res.render('quiz/select/playing.ejs');
}
const getResult = (req, res, next) =>{
    res.render('quiz/templates/result.ejs');
}


module.exports = {
    getStart,
    getResult,
    getReady,
    getPlaying,
};