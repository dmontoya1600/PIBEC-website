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
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const imageUrl = await singlePublicFileUpload(req.file);
      console.log('STFF=>', imageUrl, req.body)

      return res.json({
        user,
      });
    }),
  );

module.exports = router;
