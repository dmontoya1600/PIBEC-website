import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Calendar.css'
import {monthObj} from './calendarFunction'

function Calendar(){
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState(monthObj)
  console.log('month', monthObj)

  return (
    <div className='calendar__component'>
        <div className='calendar__page'>
            {Object.keys(calendar).map(day => {
                let date = monthObj[day]
                return(
                    <div key={day} className={`calendar__day ${date.dayOfMonth === new Date().getDate() ? 'today__date' : ''}`}>
                        <p>{date.dayOfMonth}</p>
                    </div>
                )
            })}
        </div>
    </div>
  );
}

export default Calendar;
