
const getFoods = (req, res, next) =>{
    res.render('quiz/select/playing.ejs');
}
const getStart = (req, res, next) =>{
    res.render('quiz/templates/intro.ejs');
}
const getResult = (req, res, next) =>{
    res.render('quiz/templates/result.ejs');
}


module.exports = {
    getFoods,
    getStart,
    getResult
};