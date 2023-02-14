const express = require("express");
const app = express();
const mongoose = require('mongoose');
const gameSelectRoutes = require('./routes/gameSelect')
const gameCompareRoutes = require('./routes/gameCompare')
const indexRoutes = require('./routes/index');
const gameFlashcardRoutes = require('./routes/gameFlashcard')

app.use(express.static(__dirname + "/public"));
app.use(express.static('./views'));
//DB接続
// mongoose.connect("mongodb+srv://yukinagats:abc@cluster0.cogxrva.mongodb.net/?retryWrites=true&w=majority"
// )
mongoose.connect("mongodb+srv://yukinagats:abc@cluster0.cogxrva.mongodb.net/"
)
.then(()=>{
    console.log('DB test connencted!!')
})
.catch((err)=> console.log(err))



app.listen(3000, ()=>{
    console.log("server start")
})
app.set('view engine', "ejs")


app.use('/', indexRoutes);
app.use("/game/select", gameSelectRoutes);
app.use("/game/compare", gameCompareRoutes);
app.use("/game/flashcard", gameFlashcardRoutes);

