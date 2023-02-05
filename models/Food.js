const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name:{
        type: String
    },
    image:{ 
        type: String
    },
    carbo:{
        type: Number
    }
})

module.exports = mongoose.model('Food', FoodSchema);

