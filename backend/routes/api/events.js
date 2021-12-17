const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User, Array, Image, Event } = require('../../db/models');
const {monthObj} = require('../../calendarFunction')


  router.get(
    '/',
    asyncHandler(async (req, res) => {

      const allEvents = await Event.findAll()


      allEvents.forEach(event => {

        monthObj[parseInt(event.dataValues.dayOfYear)].event = event.dataValues.title
        monthObj[parseInt(event.dataValues.dayOfYear)].time = event.dataValues.timeOfEvent
        monthObj[parseInt(event.dataValues.dayOfYear)].id = event.dataValues.id

      })

      return res.json({
            'monthObj': monthObj
      });
    }),
  );


  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const {dayOfYear, eventTitle, eventTime} = req.body

      const eventCreate = await Event.create({
        title: eventTitle,
        dayOfYear,
        timeOfEvent: eventTime
      })
      const allEvents = await Event.findAll()


      allEvents.forEach(event => {

        monthObj[parseInt(event.dataValues.dayOfYear)].event = event.dataValues.title
        monthObj[parseInt(event.dataValues.dayOfYear)].time = event.dataValues.timeOfEvent
        monthObj[parseInt(event.dataValues.dayOfYear)].id = event.dataValues.id

      })

      return res.json({
        'monthObj': monthObj
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
