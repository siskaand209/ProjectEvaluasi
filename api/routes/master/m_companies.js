const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Company model
const Company = require('../../models/master/m_company');

//Get all
router.get('/', (req, res, next) => {
    Company.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Get by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Company.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

//Post
router.post('/', (req, res, next) => {
    const newCompany = new Company({
        _id : new mongoose.Types.ObjectId(),
        code : req.body.code,
        name : req.body.name,
        adress : req.body.adress,
        phone : req.body.phone,
        email : req.body.email,
        isDelete : req.body.is_delete,
        createdBy : req.body.created_by
    });

    newCompany.save()
        .then(result => {
            console
            .log(result);
            res.status(201).json(result);   
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
});

//Edit dan update
router.patch('/:id', (req, res, next) => {
    var newT = new Company (req.body);
    newT.updatedDate = Date.now();
    //console.log(newM);
    const id = req.params.id;
    Company.update({ _id: id }, { $set: newT })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

//Hapus
router.delete('/:id', (req, res, next) =>{
    const id = req.params.id;
    Company.remove({_id : id})
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