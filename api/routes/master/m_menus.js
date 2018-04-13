const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Menu = require('../../models/master/m_menu');

//get all
router.get('/', (req, res, next) => {
    Menu.find()
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
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Menu.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

//insert
router.post('/', (req, res, next) => {
    const newMenu = new Menu({
        _id : new mongoose.Types.ObjectId(),
        code : req.body.code,
        name : req.body.name,
        controller : req.body.controller,
        parentId : req.body.parentId,
        isDelete : req.body.isDelete,
        createdBy: req.body.createdBy,
        createdDate : req.body.createdDate,
        updatedBy: req.body.updatedBy
    });

    newMenu.save()
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
router.patch('/:id',(req, res, next) => {
    var newA = new Menu(req.body);
    newA.updateDate = Date.now();
    const id = req.params.id;
    Menu.update({_id: id}, { $set: newA})
        .exec()
        .then (result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        })
});

//delete
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Menu.remove({_id: id})
    .exec()
    .then ( result => {
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});

module.exports = router;