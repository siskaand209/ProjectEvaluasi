const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Company model
const Company = require('../../models/master/m_company');

//Get all
router.get('/', (req, res, next) => {
    Company.find()
           .where('isDelete').equals(false)
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
    GetNewCode(response => {
        const newCompany = new Company({
            _id : new mongoose.Types.ObjectId(),
            code : response,
            name : req.body.name,
            adress : req.body.adress,
            phone : req.body.phone,
            email : req.body.email,
            isDelete : req.body.is_delete,
            createdBy : req.body.createdBy
        });
        
        newCompany.save()
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
    var newCode = "CP";
    var lastCode = newCode + "0001";

    Company.findOne({code: new RegExp(newCode, 'i')})
            .sort({code: -1})
            .exec((err, doc)=> {
                if (doc != null) {
                    var arr = doc.code.split("P");
                    var inc = parseInt (arr [1]) + 1;
                    lastCode = newCode + ("0000" + inc).slice (-4);
                    return callback (lastCode);
                }else{
                    return callback(lastCode);
                }
            })
}

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

router.put('/:id', (req, res, next) => {
    var newT = new Company (req.body);
    newT.isDelete = true;
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