const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.post('/', userController.postUser);
router.post('/login', userController.loginUser);
router.get('/profile', userController.getUserProfile);


module.exports = router;
