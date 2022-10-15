const mongoose = require('mongoose');

const recipe =mongoose.model('recipe',{

user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
},  
title: {
    type: String,
    // required: [true, 'title is required']
},
//ingredients is an array of objects with name and quantity properties 
ingredients: [{
    name: {
        type: String,
        // required: [true, 'name is required']
    },
    quantity: {
        type: String,
        // required: [true, 'quantity is required']
    },

}],
category: {
    type: String,
    // required: [true, 'category is required']
},

//instructions is an array of objects with step and description properties
instructions: [{
    step: {
        type: Number,
        // required: [true, 'step is required'],
    },
    description: {
        type: String,
        // required: [true, 'description is required']
    }
}],
    image: {
    type: String,
},
comments: [{
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    comment: {
        type: String,
    //    required: [true, 'comment is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        ref: 'user',
    },
    rating: {
        type: Number,
    },
}],
difficulty: {
    type: String,
},
number: {
    type: String,
},


date: {
    type: Date,
    default: Date.now
}
}); 

module.exports = {recipe};