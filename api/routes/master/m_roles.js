const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// m_role model
const Role = require('../../models/master/m_role');
//get all
router.get('/', (req, res, next) => {
    Role.find()
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
    Role.findById(id)
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
    GetNewCode(response => {
        const newRole = new Role({
            _id: new mongoose.Types.ObjectId(),
            code: response,
            name: req.body.name,
            description: req.body.description,
            isDelete: req.body.isDelete,
            createdBy: req.body.createdBy
        });

        newRole.save()
            .then(doc => {
                console.log(doc);
                res.status(201).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
    })
});

function GetNewCode(callback) {
    var newCode = "RO";
    var lastCode = newCode + "0001";

    Role.findOne({ code: new RegExp(newCode, 'i') })
        .sort({ code: -1 })
        .exec((err, doc) => {
            if (doc != null) {
                var arr = doc.code.split("O");
                var inc = parseInt(arr[1]) + 1;
                lastCode = newCode + ("0000" + inc).slice(-4);
                return callback(lastCode);
            } else {
                return callback(lastCode);
            }
        })
};

//update
router.patch('/:id', (req, res, next) => {
    var newData = new Role(req.body);
    newData.updatedDate = Date.now();

    const id = req.params.id;

    Role.update({ _id: id }, { $set: newData })
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
    Role.remove({ _id: id })
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

module.exports = router;