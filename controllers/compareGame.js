const Food = require("../models/Food")


const getStart = (req, res, next) =>{
    res.render('quiz/templates/intro.ejs');
    res.sendFile(path.join(__dirname, '../public', 'html/index.html'));
}
const getReady = async(req, res, next) =>{

    // try{
    //     Food.aggregate([
    //         { $sample: { size: 10 } }
    //     ], (err, foods) => {
    //         console.log(foods);
    //         res.redirect(`/game/select/playing?foods=${foods}`);
    //     });
    //     //const foods = await Food.find({});
    //     // res.redirect(`/game/select/playing?foods=${foods}`);
    // }catch (err){
    //     console.log("failed")
    // }


}
const getPlaying = (req, res, next) =>{
    const foods = req.query.foods;
    res.render('quiz/compare/playing.ejs', { foods: foods });
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