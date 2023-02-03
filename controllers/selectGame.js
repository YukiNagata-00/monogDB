const Food = require("../models/Food")


const getStart = (req, res, next) =>{
    res.render('quiz/templates/intro.ejs');
}
const getReady = async(req, res, next) =>{
    console.log("ready")
        try{
        const foods = await Food.find({});
        console.log(foods)
        res.render('../views/quiz/select/playing.ejs', { foodData: foods })
    }catch (err){
        console.log("failed")
    }
    
}
const getPlaying = (req, res, next) =>{
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