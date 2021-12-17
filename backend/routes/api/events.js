const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User, Array, Image } = require('../../db/models');
const {monthObj} = require('../../calendarFunction')


  router.get(
    '/',
    asyncHandler(async (req, res) => {
      console.log(monthObj)
      return res.json({
            'monthObj': monthObj
      });
    }),
  );


  router.post(
    '/',
    asyncHandler(async (req, res) => {
      console.log(req.body)
      return res.json({

      });
    }),
  );

router.delete(
  '/:id',
    asyncHandler(async (req, res) => {
      const id = req.params.id;
      const image = await Image.findByPk(id)

      return res.json({

      });

    })
)

module.exports = router;
