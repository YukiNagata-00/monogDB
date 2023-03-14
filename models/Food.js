const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    foodname:{
        type: String
    },
    image:{ 
        type: String
    },
    carbo:{
        type: Number
    },
    username:{
        type: String
    }
})

module.exports = mongoose.model('Food', FoodSchema);

