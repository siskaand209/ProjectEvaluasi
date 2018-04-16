const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Employee Model
const Employee = require('../../models/master/m_employee');

//get all 
router.get('/', (req, res, next) => {
    Employee.find()
            .populate('companys', 'code name')
            .where('isDelete').equals(false)
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
router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    Employee.findById(id)
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
});

//insert
router.post('/', (req, res, next) => {
    const newEmployee = new Employee({
        _id : new mongoose.Types.ObjectId(),
        code : req.body.code,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        mCompanyId : req.body.mCompanyId,
        email : req.body.email,
        isDelete : req.body.isDelete,
        createdBy : req.body.createdBy,
       
    });

    newEmployee.save()
        .then(result => {
            console.log(result);
            res.status(210).json(result);
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
    var newM = new Employee(req.body);
    newM.updatedDate = Date.now();
    //console.log(newM);
    const id = req.params.id;
    Employee.update({ _id: id }, { $set: newM })
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
    var newM = new Employee(req.body);
    newM.isDelete = true;
    //console.log(newM);
    const id = req.params.id;
    Employee.update({ _id: id }, { $set: newM })
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
router.delete('/:id', (req,res,next) => {
    const id = req.params.id;
    Employee.remove({_id : id})
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