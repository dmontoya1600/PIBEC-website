import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Calendar.css'

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

      if(month > 1){
          lastMonth = month - 1
      } else{
          lastMonth = 12
      }
      let daysInLastMonth = new Date(year, lastMonth, 0).getDate()

      for(let j = 0; j < dayOfWeek; j++){
          let subDay = dayOfWeek - j
          let lastMonthDay = new Date(year, lastMonth, daysInLastMonth - subDay)
          let dayOfMonth = new Date(year, lastMonth, daysInLastMonth - subDay).getDate()
          let dayOfYear = daysIntoYear(lastMonthDay)
          monthObj[dayOfYear] = {dayOfMonth, monthDay: lastMonthDay, weekDay: j, month: lastMonth +1, year}
          console.log('INSIDE MONTH', monthObj)
      }
  }
  let dayOfYear = daysIntoYear(thisDate)
  monthObj[dayOfYear] = {dayOfMonth: i,monthDay: thisDate, weekDay: dayOfWeek, month: month +1, year}

}


function Calendar(){
  const dispatch = useDispatch();
  const [month, setMonth] = useState(monthObj)
  console.log('month', monthObj)

  return (
    <div className='calendar__component'>
        {Object.keys(month).map(day => {
            let date = monthObj[day]
            return(
                <div key='day' className='calendar__day'>{date.dayOfMonth}</div>
            )
        })}
    </div>
  );
}

export default Calendar;
