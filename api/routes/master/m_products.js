const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//product model
const Product = require('../../models/master/m_product');

//get all
router.get('/', (req, res, next) => {
    Product.find()
            .where('isDelete').equals(false)
            .exec()
            .then(doc => {
                res.status(200).json(doc);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err
                })
            })
});

//get by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.findById(id)
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error : err
                })
            })
})

//insert
router.post('/', (req, res, next) => {
    GetNewCode(response => {
        const newProduct = new Product({
        _id : new mongoose.Types.ObjectId(),
        code : response,
        name : req.body.name,
        description: req.body.description,
        isDelete: req.body.isDelete,
        createdBy: req.body.createdBy
        });
        
        newProduct.save()
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
    })
});

function GetNewCode(callback){
    var newCode = "PR";
    var lastCode = newCode + "0001";

    Product.findOne({code: new RegExp(newCode, 'i')})
            .sort({code: -1})
            .exec((err, doc) => {
                if (doc != null){
                    var arr = doc.code.split("R");
                    var inc = parseInt(arr[1]) + 1;
                    lastCode = newCode + ("0000"+inc).slice(-4);
                    return callback(lastCode);
                }else{
                    return callback(lastCode);
                }
            })
};

router.patch('/:id', (req,res,next) => {
    var newM = new Product(req.body);
    newM.updatedDate = Date.now();
    const id = req.params.id;
    Product.update({_id : id}, {$set: newM})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : err
            });
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Product.remove({ _id : id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message : err
            });
        });
});

router.put('/:id', (req, res, next) => {
    var newData = new Product(req.body);
    newData.isDelete = true;

    const id = req.params.id;

    Product.update({ _id: id }, { $set: newData })
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