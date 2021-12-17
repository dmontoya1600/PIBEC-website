
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
          console.log('INSIDE MONTH', monthObj)
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
        nextMonth = 1
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


export {monthObj};
