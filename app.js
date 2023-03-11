const express = require("express");
const app = express();
const mongoose = require('mongoose');
const gameSelectRoutes = require('./routes/gameSelect')
const gameCompareRoutes = require('./routes/gameCompare')
const indexRoutes = require('./routes/index');
const gameFlashcardRoutes = require('./routes/gameFlashcard')
const authRoutes = require('./routes/auth')
const settingRoutes = require('./routes/setting');
// eslint-disable-next-line no-unused-vars
const introRoutes = require('./routes/intro')


//require('./mail/mail')
app.use(express.static(__dirname + "/public"));
app.use(express.static('./views'));
app.use(express.json());
require('dotenv').config();

//DB接続

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
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
app.use('/auth', authRoutes);
app.use('/setting', settingRoutes);
app.use("/intro",introRoutes )

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_2IZI-p_v5KZUdIvebshc1VJ2S-VuGV0",
  authDomain: "carbomee.firebaseapp.com",
  projectId: "carbomee",
  storageBucket: "carbomee.appspot.com",
  messagingSenderId: "783415692002",
  appId: "1:783415692002:web:08ec31dfc61dcb7dfc2cbb"
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);