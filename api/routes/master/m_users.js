const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Model
const User = require('../../models/master/m_user');
const Role = require('../../models/master/m_role');
const Employee = require( '../../models/master/m_employee');

//get all
router.get('/', (req, res, next) => {
    User.find()
        .populate('role')
        .populate('employee')
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
        .populate('role')
        .populate('employee')
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
        mRoleId : req.body.mRoleId,
        mEmployeeId : req.body.mEmployeeId,
        isDelete : req.body.isDelete,
        createdBy: req.body.createdBy
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
    var newM = new User(req.body);
    newM.updateDate = Date.now();
    const id = req.params.id;
    User.update({_id : id}, {$set : newM })
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