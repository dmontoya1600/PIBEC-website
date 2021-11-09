const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.CHURCH_EMAIL,
    pass: process.env.CHURCH_PASSWORD
  }
});


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

  router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

  router.post(
    '/email',
    asyncHandler(async (req, res) => {
      const { email, message } = req.body;

      const mailOptions = {
        from: process.env.CHURCH_EMAIL,
        to: process.env.PERSONAL_EMAIL,
        subject: `Email Received from ${email}`,
        text: message
      };
      const mailOptions2 = {
        from: process.env.CHURCH_EMAIL,
        to: email,
        subject: `Thank you for your email!`,
        text: 'We received your email! If you had a question we will get back to you as soon as possible! If you had a prayer request, we will put it in our petitions!'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      transporter.sendMail(mailOptions2, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.json({
        'message':'Email Succesfully sent!'
      });
    }),
  );


module.exports = router;
