const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Array, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });

      return res.json({
        user,
      });
    }),
  );

module.exports = router;
