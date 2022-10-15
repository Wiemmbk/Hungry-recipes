const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { user } = require('../models/users');
const {recipe} = require('../models/recipes');


//====================================================================USERS====================================================================

//get all users validé
    router.get('/api/users', (req, res) => {
        user.find({}, (err, data) => { 
            if(!err) {
                res.send(data);
            }
            else {
                console.log(err);
            }
        });
    });

// Get single user by id validé
 router.get('/api/user/:id', (req, res) => {
     user.findById(req.params.id, (err, data) => {
         if(!err) {
             res.send(data);
         }
         else {
             console.log(err);
             res.status(400).json({ code:400, message: err });
         }
     });
     }); 

     // Update user validé
     router.put('/api/user/:id', async (req, res) => {
        let Userpassword = req.body.password?.toString();
        let newPass = await bcrypt.hash(Userpassword, parseInt(10));

         const use = {
            username: req.body.username,
            password: newPass,
            email: req.body.email,
         };
         user.findByIdAndUpdate(req.params.id, {$set: use}, {new: true}, (err, data) => {
             if(!err) {
                 res.status(200).json({ code:200, message: 'user updated successfully',
                 updateduser: data });
             }
             else {
                 console.log(err);
                 res.status(400).json({ code:400, message: err });
             }
         } );
     } );
 
     // Delete user validé
     router.delete('/api/user/:id', (req, res) => {
         user.findByIdAndRemove(req.params.id, (err, data) => {
             if(!err) {
                 res.status(200).json({ code:200, message: 'user deleted successfully',
                 deleteduser: data });
             }
         } );
     });
 
     //get all recipes for a user_id Validé
             router.get('/api/user/:id/recipes', (req, res) => {
            recipe.find({user_id: req.params.id}, (err, data) => {
                if(!err) {
                    res.send(data);
                }
                else {
                    console.log(err);
                }
            });
        });
            //get all favorite recipes of a user with the title and rating
            router.get('/api/user/:id/favorites/', (req, res) => {
                user.findById(req.params.id, (err, data) => {
                    if(!err) {
                        res.send(data.favorite_recipes);
                    }
                    else {
                        console.log(err);
                        res.status(400).json({ code:400, message: err });
                    }
                });
                });        


           //add a favorite recipe with title and id to a user
        router.put('/api/user/:id/favorites', (req, res) => {
            user.findByIdAndUpdate(req.params.id, {$push: {favorite_recipes: {title: req.body.title, recipe_id: req.body.recipe_id}}}, {new: true}, (err, data) => {
                if(!err) {
                    res.status(200).json({ code:200, message: 'favorite recipe added successfully',
                    updateduser: data });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            } );
        } );


            //delete a favorite_recipes in user by user_id and recipe.id
            router.delete('/api/user/:id/favorites/', (req, res) => {
                user.findByIdAndUpdate(req.params.id, {$pull: {favorite_recipes: {title: req.body.title, recipe_id: req.body.recipe_id}}}, {new: true}, (err, data) => {
                    if(!err) {
                        res.status(200).json({ code:200, message: 'favorite recipe deleted successfully',
                        updateduser: data });
                    }
                    else {
                        console.log(err);
                        res.status(400).json({ code:400, message: err });
                    }
                } );
            } );
            //   router.delete('/api/user/:id/favorites/', (req, res) => {
            //     user.findByIdAndUpdate(req.params.id, {$pull:{favorite_recipes: {title: req.body.title, recipe_id: req.body.recipe_id}}}, {new: true}, (err, data) => { 
            //         if(!err) {
            //             res.status(200).json({ code:200, message: 'recipe deleted from favorites successfully',
            //             updateduser: data });
            //         }
            //         else {
            //             console.log(err);
            //             res.status(400).json({ code:400, message: err });
            //         }
            //     } );
            // } );

            //register a user validé
            router.post('/api/user/signup', async (req, res) => {
                let Userpassword = req.body.password?.toString();
                let newPass = await bcrypt.hash(Userpassword, parseInt(10));
                const use = new user({
                    username: req.body.username,
                    password: newPass,
                    email: req.body.email,
                });
                use.save((err, data) => {
                    if(!err) {
                        res.status(200).json({ code:200, message: 'user sign up successfully',
                        user: data });
                    }
                    else {
                        console.log(err);
                        res.status(400).json({ code:400, message: err });
                    }
                });
            });
   

        

//====================================================================RECIPES====================================================================
//get all recipes validé
router.get('/api/recipes', (req, res) => {
    recipe.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        }
        else {
            console.log(err);
        }
    });
});

// Get single recipe by id validé
router.get('/api/recipe/:id', (req, res) => {
    recipe.findById(req.params.id, (err, data) => {
        if(!err) {
            res.send(data);
        }
        else {
            console.log(err);
            res.status(400).json({ code:400, message: err });
        }
    });
    });

        // find the recipes by same title
        router.get('/api/recipe', async(req, res) => {
        const search = req.query.search;
        const title = req.query.title
        if (!search) {
            return res.status(400).json({ code: 400, message: 'Please provide a search term' })
        }
        let postz = await recipe.find({ title : search})
        if (!postz) {
    
            if (!userId) {
                return res.status(400).json({ code: 400, message: 'No user found' }) 
            }
            console.log('caca')
            postz = new post({
                timestamps :  Date.now(),
                title : recipe.title
            }) 
            postz.save()
        }    
        return res.status(200).json(postz)
       });


    // get single recipe by user id  validé 
    router.get('/api/recipe/user/:id', (req, res) => {
        recipe.find({user_id: req.params.id}, (err, data) => {
            if(!err) {
                res.send(data);
            }
            else {
                console.log(err);
                res.status(400).json({ code:400, message: err });
            }
        });
        });

    // get recipes by category validé
    router.get('/api/recipe/category/:category', (req, res) => {
        recipe.find({category: req.params.category}, (err, data) => {
            if(!err) {
                res.send(data);
            }
            else {
                console.log(err);
                res.status(400).json({ code:400, message: err });
            }
        });
        });

        // post a recipe by user id validé
        router.post('/api/recipe', (req, res) => {
            const rec = new recipe({
                title: req.body.title,
                category: req.body.category,
                ingredients: req.body.ingredients,
                instructions: req.body.instructions,
                difficulty: req.body.difficulty,
                number: req.body.number,
                user_id: req.body.user_id,
            });
            rec.save((err, data) => {
                if(!err) {
                    res.status(200).json({ code:200, message: 'recipe added successfully',
                    recipe: data });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            });
    
        });


        // update a recipe by id
        router.put('/api/recipe/:id', (req, res) => {
            recipe.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
                if(!err) {
                    res.status(200).json({ code:200, message: 'recipe updated successfully',
                    updatedrecipe: data });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            } );
        } );

        // delete a recipe by id validé
        router.delete('/api/recipe/:id', (req, res) => {
            recipe.findByIdAndDelete(req.params.id, (err, data) => {
                if(!err) {
                    res.status(200).json({ code:200, message: 'recipe deleted successfully',
                    deletedrecipe: data });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            });
        });

        // post a comment to a recipe by user id  validé
        router.post('/api/recipe/:id/comment', (req, res) => {
            recipe.findByIdAndUpdate(req.params.id, {$push: {comments: {user_id: req.body.user_id, comment: req.body.comment,username: req.body.username,rating: req.body.rating}}}, {new: true}, (err, data) => {
                if(!err) {
                    res.status(200).json({ code:200, message: 'comment added successfully',
                    updatedrecipe: data });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            } );
        } );

       

        //get  all Recipe by recent date validé
        router.get('/api/recipes/recent', (req, res) => {
            recipe.find({}).sort({date: -1}).exec((err, data) => {
                if(!err) {
                    res.send(data);
                }
                else {
                    console.log(err);
                }
            });
        });
     

        // retrieve all averages ratings and titles recipes_id of recipes 
        router.get('/api/recipes/rating', (req, res) => {
            recipe.find({}, (err, data) => {
                if(!err) {
                    let titleAverage = [];
                    for (let i = 0; i < data.length; i++) {
                        let comments = data[i].comments;
                        let sum = 0;
                        for (let j = 0; j < comments.length; j++) {
                            sum += comments[j].rating;
                        }
                        if (sum !== 0) {
                            let average = (sum / comments.length).toFixed(2);
                            titleAverage.push({recipe_id: data[i]._id, title: data[i].title, average: average});
                            }else { let average = 0;
                                titleAverage.push({recipe_id: data[i]._id, title: data[i].title, average: average});}
                    }
                    res.status(200).json({ code:200, message: 'average rating',
                    titleAverage: titleAverage });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            });
        });
    
        // retrieve all averages ratings and titles with substring of title.recipes
        router.get('/api/recipes/rating/title', (req, res) => {
            recipe.find({title: {$regex: req.query.search, $options: 'i'}}, (err, data) => {
                if(!err) {
                    let titleAverage = [];
                    for (let i = 0; i < data.length; i++) {
                        let comments = data[i].comments;
                        let sum = 0;
                        for (let j = 0; j < comments.length; j++) {
                            sum += comments[j].rating;
                        }
                        if (sum !== 0) {
                            let average = (sum / comments.length).toFixed(2);
                            titleAverage.push({recipe_id: data[i]._id, title: data[i].title, average: average});
                            }else { let average = 0;
                                titleAverage.push({recipe_id: data[i]._id, title: data[i].title, average: average});}
                    }
                    res.status(200).json({ code:200, message: 'average rating',
                    titleAverage: titleAverage });
                }
                else {
                    console.log(err);
                    res.status(400).json({ code:400, message: err });
                }
            });
        });
        
        
        //====================================================================auth====================================================================

  //login with user id and bcrypt   Token sortie mais j'en fais quoi mtn ?


  // login route
router.post('/api/user/login', async (req, res, data) => {
    const signIn = await user.findOne({ email: req.body.email})
    if (signIn) {
        const validPass = await bcrypt.compare(req.body.password, signIn.password);
        if (validPass) {
            const token = jwt.sign({id: data._id}, 'secretkey');
            res.send({ id: signIn.id, 
                    username: signIn.username, 
                    email: signIn.email,
                    favorite_recipes: signIn.favorite_recipes,
                    token: token
                    })
                    
        }
        else {
            res.status(400).json({ error: "Invalid Password"});
        } 
    }
    else {
        res.status(401).json({ error: "User doesn't exist"});
    }
}),

  
// // image upload route put in recipe
// router.put('/api/recipe/:id/image', upload.single('file'), (req, res) => {
//     recipe.findByIdAndUpdate(req.params.id, {image: req.file.path}, (err, data) => {
//         if(!err) {
//             res.status(200).json({ code:200, message: 'image added successfully',
//             updatedrecipe: data });
//         }
//         else {
//             console.log(err);
//             res.status(400).json({ code:400, message: err });
//         }
//     });
// }); 

  
    
    




//logout with jwt req.headers.cookie = token

router.get('/api/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ code:200, message: 'logout successfully' });
});



module.exports = router;