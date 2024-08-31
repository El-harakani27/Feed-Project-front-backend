const userController = require('../controllers/userController');
const express = require('express')
const router = express.Router();
router.put('/signup',userController.createUser)
router.post('/login',userController.userLogin)
module.exports =router