const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const User = require('../model/userModel');
const {
  userSchema, routineSchema, excersiceSchema, pendingExcersiceSchema
} = require('../swaggerComments/schemaComments');

dotenv.config();

const {
  orgMail, orgPassword, webUrl
} = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  hots: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: orgMail,
    pass: orgPassword
  }
});

exports.sendVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send('User not found.');
  }

  const { verification } = user;

  const mailOption = {
    from: {
      name: 'Gym App cl Inc.',
      address: orgMail
    },
    to: email,
    subject: 'Verificacion de cuenta, GymApp',
    text:
        `Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico: ${webUrl}user/${verification}`
  };

  try {
    const info = await transporter.sendMail(mailOption);
    return res.status(200).json({
      success: true,
      message: 'Cuenta creada, correo de verificación enviado correctamente',
      info
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al enviar correo de verificación.',
      error
    });
  }
});

exports.userVerification = asyncHandler(async (req, res) => {
  const { verificationId } = req.params;

  try {
    const userValidated = await User.findOneAndUpdate(
      { verification: verificationId },
      { verified: true },
      { new: true }
    );

    if (!userValidated) {
      return res.status(404).json({
        success: false,
        message: 'User not found or already verified.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User verified succesfully.',
      user: userValidated
    });
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error verifying user.',
      error: error.message
    });
  }
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename(req, file, cb) {
    const userId = req.user.prop._id;
    cb(null, `${userId}${Date.now()}`);
  }
});

exports.upload = multer({ storage });

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gym App Cl',
      version: '1.0.0'
    }
  },
  components: {
    securitySchemes: {
      schemas: {
        User: userSchema,
        Routine: routineSchema,
        Excercise: excersiceSchema,
        PendingExcersice: pendingExcersiceSchema
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],

  apis: ['./routes/index.js', './model/User.js', './swaggerComments/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

exports.swaggerDocs = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    'Version 1 Docs are available on /api-docs'
  );
};
