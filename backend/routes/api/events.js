const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { User, Array, Image, Event } = require('../../db/models');
// const {monthObj} = require('../../calendarFunction')

let currentDate = new Date()
let month = currentDate.getMonth()
let year = currentDate.getFullYear()
let dayOfMonth = currentDate.getDate()
let daysInMonth = new Date(year, month +1, 0).getDate()
let monthObj={}
function daysIntoYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

for(let i = 1; i <= daysInMonth; i++){
  let thisDate = new Date(year, month, i);
  let dayOfWeek = thisDate.getDay()
  if(i === 1 && dayOfWeek > 0){
      let lastMonth;
      let yearOfMonth = year
      if(month > 1){
          lastMonth = month - 1
      } else{
          lastMonth = 11
          yearOfMonth = year - 1
      }
      let daysInLastMonth = new Date(yearOfMonth, lastMonth, 0).getDate()
      for(let j = 0; j < dayOfWeek; j++){
          let subDay = dayOfWeek - j
          let lastMonthDay = new Date(yearOfMonth, lastMonth, daysInLastMonth - subDay)
          let dayOfMonth = new Date(yearOfMonth, lastMonth, daysInLastMonth - subDay).getDate()
          let dayOfYear = daysIntoYear(lastMonthDay)
          monthObj[dayOfYear] = {dayOfYear, dayOfMonth, monthDay: lastMonthDay, weekDay: j, month: lastMonth +1, yearOfMonth}

      }
  }
  let dayOfYear = daysIntoYear(thisDate)
  monthObj[dayOfYear] = {dayOfYear, dayOfMonth: i,monthDay: thisDate, weekDay: dayOfWeek, month: month +1, year}
  if(i === daysInMonth && dayOfWeek < 6){
    let nextDays = 1;
    let nextMonth;
    let yearOfMonth = year
    let newYear = false
    if(month === 11){
        nextMonth = 0
        yearOfMonth = year + 1
        newYear = true
    } else{
        nextMonth = month + 1
    }
    for(let j = dayOfWeek + 1; j <=6 ; j++){
        let nextMonthDay = new Date(yearOfMonth, nextMonth, nextDays)
        let nextDayOfYear = daysIntoYear(nextMonthDay)
        if(newYear === true){
            nextDayOfYear+=365
        }

        monthObj[nextDayOfYear] = {dayOfYear, dayOfMonth: nextDays, monthDay: nextMonthDay, weekDay: j, month: nextMonth +1, yearOfMonth}
        nextDays++

    }
  }
}




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
