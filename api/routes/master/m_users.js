const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Model
const User = require('../models/user');


//get all
router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
    });
});

//get by id
router.get('/:id', (req, res, next) =>{
    const id = req.params.id;
    User.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error : err
            })
        })
});

//insert
router.post('/', (req, res, next) => {
    const newUser = new User({
        _id : new mongoose.Types.ObjectId(),
        username : req.body.username,
        password : req.body.password,
        m_role_id : req.body.m_role_id,
        m_employee_id : req.body.m_employee_id,
        is_delete : req.body.is_delete,
        created_by: req.body.created_by,
        create_date: req.body.create_date,
        updated_by : req.body.updated_by,
        update_date : req.body.update_date
    });

    newUser.save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
});

//update
router.patch('/:id', (req,res, next) =>{
    const id = req.params.id;
    User.update({_id : id}, {$set : req.body})
        .exec()
        .then( result =>{
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
});

//delete
router.delete('/:id', (req, res, next) =>{
    const id = req.params.id;
    User.remove({_id : id})
    .exec()
    .then( result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});

module.exports = router;