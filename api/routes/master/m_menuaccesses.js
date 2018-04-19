const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// m_role model
const MenuAccess = require('../../models/master/m_menu_access');
const Role = require('../../models/master/m_role');
const Menu = require('../../models/master/m_menu')

//get all
router.get('/', (req, res, next) => {
    MenuAccess.find()
        .populate({ path: 'role', select: 'code name description isDelete createdBy updatedBy' })
        .populate({ path: 'menu', select: 'code name controller parentId createdBy updatedBy' })
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

//get All Role
router.get('/roles/:id', (req, res, next) => {
    var id = req.params.id;
    GetRole(id, response => {
        Role.findOne({ _id: id })
            .exec()
            .then(doc => {
                res.status(200).json({
                    role: doc,
                    menuaccess: response
                });
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });
});//end get all role



//get  by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    MenuAccess.findById(id)
        .populate('menu', '_id code name controller parentId createdBy createdDate')
        .populate('role', '_id code name description isDelete createdBy updatedBy')
        .where('isDelete').equals(false)
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
        role: req.body.role,
        menu: req.body.menu,
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
                error: err
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
    MenuAccess.remove({ _id: id })
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


//put
router.put('/:id', (req, res, next) => {
    var newData = new MenuAccess(req.body);
    newData.isDelete = true;

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
});//end put


module.exports = router;