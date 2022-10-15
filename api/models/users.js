const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");        


const user = mongoose.model('user', {
    username: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    favorite_recipes: [{
        title: {
          type:mongoose.Schema.Types.String,
          ref: 'recipe'
        },
        recipe_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'recipe'
        }
        
    }],
    my_recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes',
        ref: 'user_id'
    }],
     tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
    });

module.exports =  { user }


 