const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/user');

router.get('/users', userController.getUsers);

router.get('/add-user', userController.getAddUser);

router.post('/add-user', userController.postAddUser);

router.delete('/delete-user/:id', userController.deleteUser);

router.put('/edit-user/:id', userController.editUser);


module.exports = router;

