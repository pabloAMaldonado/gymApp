const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');

const { passport, generateToken, authenticateToken } = require('../configuration/passport');
const { upload } = require('../configuration/api');

dotenv.config();

const User = require('../model/userModel');
const Routines = require('../model/routineModel');

exports.userSignUp = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ username });

  if (user) {
    if (user.username === username) {
      console.log(1);
      return res.status(400).send('Error creating new user, Username already used');
    }
    if (user.email === email) {
      console.log(2);
      return res.status(400).send('Error creating new user, Email already used');
    }
  }
  const verificationId = crypto.randomBytes(16).toString('hex');
  try {
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      verified: false,
      verification: verificationId
    });

    await newUser.save();

    console.log('Usuario creado con exito');
    res.status(200).send('User registered successfully, verification email sent');
    return next();
  }
  catch (error) {
    console.log(3);
    return res.status(400).send('Error registering new user');
  }
});

exports.userLogin = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(user);
      return res.status(401).json({ error: 'Unauthorized - Incorrect username or password', user });
    }
    try {
      const userToken = generateToken(user);
      return res.status(200).send({ message: 'User logged in successfully', userToken, user });
    }
    catch (error) {
      return next(error);
    }
  })(req, res, next);
});

exports.userAddInfo = [
  authenticateToken,
  asyncHandler(async (req, res) => {
    const userData = req.user.prop;
    const data = req.body.formData;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    try {
      const user = await User.findOne({
        _id: userData._id,
        data: {
          $elemMatch: {
            date: {
              $gte: today,
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
          }
        }
      });

      if (user) {
        const userUpdate = await User.findOneAndUpdate({
          _id: userData._id,
          data: {
            $elemMatch: {
              date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
              }
            }
          }
        }, {
          $set: {
            'data.$[elem].weight': data.weight,
            'data.$[elem].height': data.height,
            'data.$[elem].years': data.years,
            'data.$[elem].date': Date.now()
          }
        }, {
          arrayFilters: [{
            'elem.date': {
              $gte: today,
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
          }],
          new: true
        });

        await userUpdate.save();
        return res.status(200).send({ message: 'User information created successfully.', userUpdate });
      }

      const userUpdate = await User.findByIdAndUpdate(user._id, {
        $push: {
          data: {
            weight: data.weight,
            height: data.height,
            years: data.years,
            date: Date.now()
          }
        }
      }, { new: true });
      await userUpdate.save();
      return res.status(200).send({ message: 'User information updated successfully.', userUpdate });
    }
    catch (error) {
      return res.status(400).send('Error updating user information.');
    }
  })

];

exports.userAddProfileImg = [
  authenticateToken,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    const userInfo = req.user.prop;
    const profilePic = req.file;
    const user = await User.findByIdAndUpdate(
      userInfo._id,
      { $set: { profileImg: profilePic } },
      { new: true }
    );
    if (!user) {
      return res.status(400).send('Error updating user profile image.');
    }
    return res.status(200).send('User profile image updated successfully.');
  })
];

exports.userInfo = [
  authenticateToken,
  asyncHandler(async (req, res, next) => {
    const { userInfo } = req;
    const [user, userRoutines] = await Promise.all([
      User.findById(userInfo._id).exec(),
      Routines.find({ createdBy: userInfo._id }, 'distribution description, days').exec()
    ]);

    if (user === null) {
      const err = new Error('no USER found.');
      err.status = 404;
      return next(err);
    }
    return res.status(200).send({ message: 'User data delivered.', user, userRoutines });
  })
];
