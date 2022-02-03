# Primera Iglesia Bautista El Calvario Website

![homeview]

### Technologies Used:
### - *Frontend: ReactJS, ReduxJS*
### - *Backend: ExpressJS*
### - *Webscraping: Python/Selenium*
### - *Deployment: Heroku*

---
## Purpose:
### Designed with the purpose of being maintained by administrators with little to no techinical experience. With the help of python webscraping and automation, the website is able to update it's live stream everytime the church goes live on Facebook. 

## Features:
* Designed for the purpose of being maintained by admininstrators with little to no technical experience.
* Utilizes **ReactJS** so that users can interact components to change them without needing to enter the source code.


![maintained]

---
* Stores user changes in **PostgreSQL** Database so that user input is saved.
* Uses **Redux** to dynamically render any changes made to the database in real-time.
---
* Authorized users can create, delete, and update calendar events. 
![calendar]
---
* Update live stream everytime church's Facebook page goes lives with the help of python webscraping automation.
![automation]

---
# Technical Details
* I created a calendar object that is capable of keeping track of all days withing the month and event taking into account months before and after New Year's. 
```
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
      if(month > 0){
          lastMonth = month - 1
      } else{
          lastMonth = 11
          yearOfMonth = year - 1
      }
      let daysInLastMonth = new Date(yearOfMonth, lastMonth +1, 0).getDate()
      for(let j = 1; j <= dayOfWeek; j++){
          let subDay = dayOfWeek - j
          let lastMonthDay = new Date(yearOfMonth, lastMonth, daysInLastMonth - subDay)
          let dayOfMonth = new Date(yearOfMonth, lastMonth, daysInLastMonth - subDay).getDate()
          let dayOfYear = daysIntoYear(lastMonthDay)
          if(year > yearOfMonth){
            let newDayOfYear = parseInt(-subDay)
            monthObj[newDayOfYear] = {dayOfYear:newDayOfYear, dayOfMonth, monthDay: lastMonthDay, weekDay: j-1, month: lastMonth +1, yearOfMonth}
          }else{
            monthObj[dayOfYear] = {dayOfYear, dayOfMonth, monthDay: lastMonthDay, weekDay: j-1, month: lastMonth +1, yearOfMonth}
          }

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
```


[calendar]: ./docs/gifs/pibec_calendar.gif
[maintained]: ./docs/gifs/pibec_gif.gif
[automation]: ./docs/gifs/pibec_script.gif
[homeview]: ./docs/images/pibec__img.png
