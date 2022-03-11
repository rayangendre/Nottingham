const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/users',function(req,res,next){
    User.find({}).then(function(users){
        res.send(users);
    }).catch(next);
});

router.post('/users',function(req,res,next){
    User.create(req.body).then(function(user){
        res.send(user);
    }).catch(next);
});

// update a student in the database
router.put('/users/:id',function(req,res,next){
    User.findOneAndUpdate({_id: req.params.id},req.body).then(function(user){
        User.findOne({_id: req.params.id}).then(function(user){
            res.send(user);
        });
    });
});

// delete a student in the database
router.delete('/users/:id',function(req,res,next){
    User.findOneAndDelete({_id: req.params.id}).then(function(user){
        res.send(user);
    });
});

module.exports = router;