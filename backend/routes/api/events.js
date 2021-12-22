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

        monthObj[event.dataValues.dayOfYear].events = {
          ...monthObj[event.dataValues.dayOfYear].events,
          [parseInt(event.dataValues.timeInMS)]: {
            time: event.dataValues.timeOfEvent,
            id: event.dataValues.id,
            title: event.dataValues.title,
            milliseconds: parseInt(event.dataValues.timeInMS),
          }
        }

      })

      return res.json({
            'monthObj': monthObj
      });
    }),
  );


  router.post(
    '/',
    asyncHandler(async (req, res) => {
      const {dayOfYear, eventTitle, eventTime, dateString, militaryTime} = req.body
      console.log('THIS IS THE MILITIME =============>', militaryTime)
      let timeInMS = new Date(dateString).getTime() + (parseInt(militaryTime.slice(0, 2)) * 3600000) + (parseInt(militaryTime.slice(3)) * 60000)

      console.log('this is timeInsMS ====>', timeInMS)

      const eventCreate = await Event.create({
        title: eventTitle,
        dayOfYear,
        timeOfEvent: eventTime,
        date: new Date(timeInMS),
        timeInMS
      })
      const allEvents = await Event.findAll()


      allEvents.forEach(event => {

        monthObj[event.dataValues.dayOfYear].events = {
          ...monthObj[event.dataValues.dayOfYear].events,
          [parseInt(event.dataValues.timeInMS)]: {
            time: event.dataValues.timeOfEvent,
            id: event.dataValues.id,
            title: event.dataValues.title,
            milliseconds: parseInt(event.dataValues.timeInMS),
          }
        }

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
