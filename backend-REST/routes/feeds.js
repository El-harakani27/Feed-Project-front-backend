const express = require('express');
const isAuth = require('../middelware/auth-token');
const router = express.Router();
const feedController = require('../controllers/feedsControllers')
router.get('/posts',isAuth,feedController.getPosts)
router.get('/:id',feedController.getOnePost)
router.post('/add-posts',isAuth,feedController.postPost)
router.put('/edit-post/:postId',isAuth,feedController.updatePost)
router.delete('/deletePost/:postId',isAuth,feedController.deletePost)
module.exports =router