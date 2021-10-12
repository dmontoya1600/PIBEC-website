const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {singlePublicFileUpload, singleMulterUpload, deleteFile} = require('../../awsS3')


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Array, Image, Embeddeded } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get(
    '/:location',
    asyncHandler(async (req, res) => {
      const location = req.params.location;

      const allEmbedded = await Embeddeded.findAll({
        where: {location: location}
      })


      const array = []
      allEmbedded.forEach(embeddedObj => {
        array.push(embeddedObj.dataValues)
      })

      return res.json({
        'array': array,
      });
    }),
  );


  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const { location } = req.body;

        // CODE HASN'T BEEN IMPLEMENTED YET, BUT IT SHOULD CHECK FOR AN ENTRY IN THE POSITION
        // IF THERE IS AN ENTRY THEN IT'LL REPLACE IT, ELSE JUST CREATE A NEW ENTRY

      const embedded = await Embeddeded.create({
        location,
        position,
        code,
      })

      const allEmbedded = await Embeddeded.findAll({
        where: {location: location}
      })


      const array = []
      allEmbedded.forEach(embeddedObj => {
        array.push(embeddedObj.dataValues)
      })

      return res.json({
        'array': array,
      });
    }),
  );

module.exports = router;
