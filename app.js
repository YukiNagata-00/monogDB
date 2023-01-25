const express = require("express");
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');



//DB接続
mongoose.connect("mongodb+srv://yukinagats:abc@cluster0.cogxrva.mongodb.net/?retryWrites=true&w=majority"
)
.then(()=>{
    console.log('DB test connencted!!')
})
.catch((err)=> console.log(err))

app.listen(3000, ()=>{
    console.log("server start")
})
app.set('view engine', "ejs")
app.use('/', routes);
