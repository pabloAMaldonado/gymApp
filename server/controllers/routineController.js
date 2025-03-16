const asyncHandler = require('express-async-handler');

const { authenticateToken, optionalAuthToken } = require('../configuration/passport');

const Routine = require('../model/routineModel');

exports.createRoutine = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    const {
      distribution, description, privacy, createdBy, days
    } = req.body.formData;
    const routine = new Routine({
      distribution,
      description,
      privacy,
      createdBy,
      days
    });
    try {
      await routine.save();
      return res.status(200).send('Routine created successfully.');
    }
    catch (error) {
      return res.status(400).send('Error creating routine.');
    }
  })
];

exports.updateRoutine = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    const userInfo = req.user.prop;
    const {
      routineId, distribution, description, privacy, days
    } = req.body;
    const routine = await Routine.findById(routineId);

    if (userInfo.username !== routine.createdBy) {
      return res.status(401).send('Unauthorized - Only the creator can update the routine.');
    }

    try {
      const updatedRoutine = await Routine.findByIdAndUpdate(
        routineId,
        {
          $set: {
            distribution, description, privacy, days
          }
        },
        { new: true }
      );

      if (!updatedRoutine) {
        return res.status(404).send('Routine not found.');
      }

      return res.status(200).send({ message: 'Routine updated successfully.', updatedRoutine });
    }
    catch (error) {
      return res.status(400).send('Error updating routine.');
    }
  })
];

exports.getRoutine = [
  optionalAuthToken,
  asyncHandler(async (req, res) => {
    let userId;
    if (req.user) {
      userId = req.user.prop.id;
    }

    // const user = await User.findById(userId);

    try {
      const routines = await Routine.find({
        $or: [
          { privacy: { $ne: 'private' } },
          { createdBy: userId }
        ]
      });

      return res.status(200).send({
        data: routines.data,
        message: 'Routine\'s data delivered succefully. '
      });
    }
    catch (error) {
      return res.status(400).json('Error sending data.', error);
    }
  })
];
