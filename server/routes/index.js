const express = require('express');

var router = express.Router();

const userController = require('../controllers/userController');
const routineController = require('../controllers/routineController');
const excersiceController = require('../controllers/excerciseController');
const API = require('../configuration/api');

router
  .get('/excersice', excersiceController.getExcercise)
  .post('/user/post-excersice', excersiceController.createPendingExcercise)
  .post('/admin/approve-excersice', excersiceController.createPendingExcercise)
  .put('/user/post-comment-excersice', excersiceController.addCommentExcercise)

  .get('/routine', routineController.getRoutine)
  .post('/user/create-routine', routineController.createRoutine)
  .put('/user/update-routine', routineController.updateRoutine)

  .get('/user/info', userController.userInfo)
  .post('/new-user', userController.userSignUp, API.sendVerification)
  .post('/login', userController.userLogin)
  .put('/user/:verificationId', API.userVerification)
  .put('/user/add-data', userController.userAddInfo)
  .put('/user/profile-pic', userController.userAddProfileImg);

module.exports = router;
