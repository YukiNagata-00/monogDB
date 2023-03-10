const mongoose = require('mongoose');

const AddCardSchema = new mongoose.Schema({
    foodname:{
        type: String
    },
    image:{ 
        type: String
    },
    carbo:{
        type: Number
    }
})

module.exports = mongoose.model('AddCard', AddCardSchema);