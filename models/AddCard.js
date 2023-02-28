const mongoose = require('mongoose');

const AddCardSchema = new mongoose.Schema({
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

module.exports = mongoose.model('AddCard', AddCardSchema);