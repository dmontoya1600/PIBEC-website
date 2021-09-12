const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {singlePublicFileUpload, singleMulterUpload, deleteFile} = require('../../awsS3')


const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Array, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

  router.get(
    '/:location',
    asyncHandler(async (req, res) => {
      const location = req.params.location;

      const allImages = await Image.findAll({
        where: {location: location}
      })


      const array = []
      allImages.forEach(imageObj => {
        array.push(imageObj.dataValues)
      })

      return res.json({
        'array': array,
      });
    }),
  );


  router.post(
    '/',
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
      const { location } = req.body;
      const {imageUrl, Key} = await singlePublicFileUpload(req.file);

      const image = await Image.create({
        location,
        imageUrl,
        key: Key
      })

      const allImages = await Image.findAll({
        where: {location: location}
      })


      const array = []
      allImages.forEach(imageObj => {
        array.push(imageObj.dataValues)
      })

      return res.json({
        'array': array,
      });
    }),
  );

router.delete(
  '/:id',
    asyncHandler(async (req, res) => {
      const id = req.params.id;
      const image = await Image.findByPk(id)
      let key = image.key
      let location = image.location
      console.log('CHECK THIS', id, location)
      await deleteFile(key)

      await image.destroy()

      const allImages = await Image.findAll({
        where: {location: location}
      })


      const array = []
      allImages.forEach(imageObj => {
        array.push(imageObj.dataValues)
      })

      return res.json({
        'array': array,
      });

    })
)

module.exports = router;
