const asyncHandler = require('express-async-handler');
const { authenticateToken } = require('../configuration/passport');

const { Excercise, PendingExcercise } = require('../model/excerciseModel');
const User = require('../model/userModel');

exports.createPendingExcercise = asyncHandler(async (req, res) => {
  const { excercise } = req.body;
  try {
    const newExcercise = new Excercise({
      name: excercise.name,
      type: excercise.type,
      muscle: excercise.muscle,
      example: excercise.example,
      description: excercise.description
    });

    await newExcercise.save();
    return res.status(200).send('Excersice created, pending approval');
  }
  catch (error) {
    return res.status(400).send('Error creating exercise', error);
  }
});

exports.approveExercise = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user = req.user.prop;
    const { excersiceId } = req.body;
    const excersice = await PendingExcercise.findById(excersiceId);

    if (!excersice) {
      return res.status(404).send('Pending exercise not found');
    }

    if (user.status !== 'admin' && user.status !== 'mod') {
      return res.status(500).send('User must be admin or mod to approve a pending exercise');
    }
    try {
      const approvedExcersice = new Excercise({
        name: excersice.name,
        type: excersice.type,
        muscle: excersice.muscle,
        example: excersice.example,
        description: excersice.description,
        approvedBy: user._id
      });

      await approvedExcersice.save();

      await excersice.remove();
      return res.status(200).send('Exercise approved succesfully');
    }
    catch (error) {
      return res.status(400).send('Error at approving exercise', error);
    }
  })
];

exports.addCommentExcercise = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    const user = req.user.prop;
    const { commentInfo, excericeId } = req.body.formData;

    const excercise = await Excercise.findById(excericeId);

    if (!user) {
      return res.status(400).send('Error no user found');
    }

    if (!commentInfo && !excercise) {
      return res.status(400).send('Error on the submit data');
    }

    try {
      excercise.comments.push({
        comment: commentInfo,
        createdAt: new Date(),
        commentBy: user._id
      });

      await excercise.save();

      return res.status(200).send('Comment posted correctly');
    }
    catch (error) {
      return res.status(500).send('Error adding the comment');
    }
  })
];

exports.getExcercise = asyncHandler(async (req, res) => {
  try {
    const excersices = await Excercise.find();

    return res.status(200).send({
      data: excersices,
      message: 'Excercise\'s data delivered succefully. '
    });
  }
  catch (error) {
    return res.status(400).json('Error seinding data', error);
  }
});
