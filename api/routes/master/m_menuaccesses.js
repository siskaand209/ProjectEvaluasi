const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// m_role model
const MenuAccess = require('../../models/master/m_menu_access');
//get all
router.get('/', (req, res, next) => {
    MenuAccess.find()
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

//get  by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    MenuAccess.findById(id)
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
    const newMenuAccess = new MenuAccess({
        _id: new mongoose.Types.ObjectId(),
        mRoleId: req.body.mRoleId,
        mMenuId: req.body.mMenuId,
        uploadedBy: req.body.uploadedBy,
        isDelete: req.body.isDelete,
        createdBy: req.body.createdBy,
    });

    newMenuAccess.save()
        .then(doc => {
            console.log(doc);
            res.status(201).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
});

//update
router.patch('/:id', (req, res, next) => {
    var newData = new MenuAccess(req.body);
    MenuAccess.updatedDate = Date.now();
    
    const id = req.params.id;

    MenuAccess.update({ _id: id }, { $set: newData })
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

//delete
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    MenuAccess.remove({ _id : id })
        .exec()
        .then(result => {
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