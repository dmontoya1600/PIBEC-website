import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Calendar.css'
import {monthObj} from './calendarFunction'
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Calendar(){
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState(monthObj)
  const [eventActive, setEventActive] = useState([false, null])

  function addEventForm(date){

      return (
        <form className='calendar__event__form'>
            <div className='calendar__event__point'></div>
            <input type='text' placeholder='New Event'/>
            <div className='form__divider'/>
            <input type='time' />
        </form>
      )
  }

  return (
    <div className='calendar__component'>

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
                return(
                    <div key={day} onClick={() => setEventActive([true, date])} className={`calendar__day ${date.dayOfMonth === new Date().getDate() ? 'today__date' : '' } ${date.weekDay === 0 || date.weekDay===6 ? 'weekend__day' : ''} `}>
                        <p>{date.dayOfMonth}</p>
                        {eventActive[0] && eventActive[1] === date ? addEventForm(eventActive[1]) : null}

                    </div>
                )
            })}
        </div>


    </div>
  );
}

export default Calendar;
