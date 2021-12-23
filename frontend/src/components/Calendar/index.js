import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Calendar.css'
import {monthObj} from './calendarFunction'
import {getEvents, createEvent} from '../../store/events'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function Calendar(){
  const dispatch = useDispatch();
  const events = useSelector(state => state.events)
  const [calendar, setCalendar] = useState(monthObj)
  const [eventActive, setEventActive] = useState([false, null])
  const [eventName, setEventName] = useState(null)
  const [eventTime, setEventTime] = useState(null)
  const [updateEvent, setUpdateEvent] = useState(null)
  const sessionUser = useSelector(state => state.session.user);



  useEffect(() => {
        dispatch(getEvents())
  },[dispatch])

  useEffect(() => {
    if(events.monthObj){
        setCalendar(events.monthObj)
    }
  },[events])

  function handleFormSubmit(e, date){
      let dateString = date.monthDay.toString()
      e.preventDefault()
      console.log('form values', date.dayOfYear, eventName, eventTime)
      let hourNum = parseInt(eventTime.slice(0,2))
      let fixedTime;
      if(hourNum > 12){
        hourNum -= 12
        fixedTime = hourNum.toString() + eventTime.slice(2) + ' PM'
      }else if(hourNum === 12){
        fixedTime = hourNum.toString() + eventTime.slice(2) + ' PM'
      }else if(hourNum === 0){
        hourNum += 12
        fixedTime = hourNum.toString() + eventTime.slice(2) + ' AM'
      } else {
        fixedTime = hourNum.toString() + eventTime.slice(2) + ' AM'
      }

      dispatch(createEvent(date.dayOfYear, eventName, fixedTime, dateString, eventTime))
      setEventActive([false, null])

  }

  function handleEventClick([e, event]){
    e.stopPropagation()
    console.log('this is event', event)
    return (
      <form className='event__update__form' onSubmit>
        
        <p>Update or Delete Event</p>
        <label>Update Title:</label>
        <input required placeholder={event.title} />
        <label>Update Time:</label>
        <input required placeholder={event.time} type='time'/>
        <submit>Update</submit>
        <div>Delete</div>
      </form>
    )
  }

  function handleBackgroundClick(e){
      e.stopPropagation()
    setEventActive([false, null])
  }

  function allEvents(events){
    return Object.keys(events).map( ms =>(
        <div className='calendar__event' onClick={(e) => setUpdateEvent([e, events[ms]])}>
          <p className='event__title'>{events[ms].title}</p>
          <p className='event__time'>{events[ms].time}</p>
        </div>
)
    )
  }

  function addEventForm(date){
      return (
        <>
            <form onSubmit={(e) => handleFormSubmit(e, date)} className='calendar__event__form'>
                <div className='calendar__event__point'></div>
                <p>{`${date.monthDay.toDateString()}`}</p>
                <input required onChange={(e) => setEventName(e.target.value)} type='text' placeholder='New Event'/>
                <div className='form__divider'/>
                <input required type='time' onChange={(e) => setEventTime(e.target.value)}/>
                <button className='form__submit'>Create</button>
            </form>
            <div onClick={(e) => handleBackgroundClick(e)} className='form__shadow'></div>
        </>
      )
  }

  return (
    <div className='calendar__component'>

        {updateEvent ? handleEventClick(updateEvent) : null}
        <div className='calendar__month'>
            <p className='month'>{monthNames[new Date().getMonth()]}</p>
            <p className='year'>{new Date().getFullYear()}</p>
            <p className='title'>Events</p>
        </div>
        <div className='calendar__week'>
            <p>Sun</p>
            <p>Mon</p>
            <p>Tue</p>
            <p>Wed</p>
            <p>Thu</p>
            <p>Fri</p>
            <p>Sat</p>

        </div>
        <div className='calendar__page'>
            {Object.keys(calendar).map(day => {

                let date = monthObj[day]
                let dynamicDate = calendar[day]

                return(
                    <div key={day} onClick={() => setEventActive([sessionUser && true, date])} className={`calendar__day ${date.monthDay.toDateString() === new Date().toDateString() ? 'today__date' : '' } ${date.weekDay === 0 || date.weekDay===6 ? 'weekend__day' : ''} `}>
                        <p>{date.dayOfMonth}</p>
                        {dynamicDate.events ? <div className='calendar__events'>{allEvents(dynamicDate.events)}</div> : null}
                        {eventActive[0] && eventActive[1] === date ? addEventForm(eventActive[1]) : null}
                    </div>
                )
            })}
        </div>


    </div>
  );
}

export default Calendar;
