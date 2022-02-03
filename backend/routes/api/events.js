const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User, Array, Image, Event } = require('../../db/models');
const {monthObj} = require('../../calendarFunction')


  router.get(
    '/',
    asyncHandler(async (req, res) => {

      const allEvents = await Event.findAll()
      let copyOfMonth = Object.assign({}, monthObj);
      console.log('MONTH OBJ BEFORE BEING CHANGES BY ALLEVENTS --->', copyOfMonth)

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
      console.log('MONTH OBJ HERE --->', monthObj)
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
      console.log('ALL EVENTS', allEvents)

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
      const event = await Event.findByPk(id)
      await event.destroy()
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

      delete monthObj[event.dataValues.dayOfYear].events[event.dataValues.timeInMS]


      return res.json({
            'monthObj': monthObj
      });

    })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const {updateTitle, eventTime, militaryTime} = req.body
    const event = await Event.findByPk(id)
    const dateString = monthObj[event.dayOfYear].monthDay.toString()
    const oldDay = event.dayOfYear
    const oldMS = event.timeInMS

    let timeInMS = new Date(dateString).getTime() + (parseInt(militaryTime.slice(0, 2)) * 3600000) + (parseInt(militaryTime.slice(3)) * 60000)


    event.title = updateTitle
    event.timeInMS = timeInMS
    event.date = new Date(timeInMS)
    event.timeOfEvent = eventTime

    await event.save()





    const allEvents = await Event.findAll()

    delete monthObj[oldDay].events[oldMS]
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


  })
)

module.exports = router;
