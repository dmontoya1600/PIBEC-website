import { csrfFetch } from './csrf';


export const UPDATE_MONTH ='events/updateMonth';
export const REMOVE_MONTH = 'events/RemoveEvent'

const setEvents = (monthObj) => {
  return {
    type: UPDATE_MONTH,
    monthObj
  };
};
const removeEvent = (dayOfYear, millisecond) => {
  return {
    type: REMOVE_MONTH,
    dayOfYear,
    millisecond
  };
}


export const getEvents = () => async dispatch => {

  const response = await csrfFetch(`api/events/`)
  const data = await response.json()
  dispatch(setEvents(data.monthObj))

}

export const createEvent = (dayOfYear, eventTitle, eventTime, dateString, militaryTime) => async dispatch => {
  const response = await csrfFetch(`api/events/`, {
      method: 'POST',
      body: JSON.stringify({
        dayOfYear,
        eventTitle,
        eventTime,
        dateString,
        militaryTime
      })
  });

  const data = await response.json()
  dispatch(setEvents(data.monthObj))
}

export const deleteEvent = (id) => async dispatch => {
  const response = await csrfFetch(`api/events/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  // dispatch(removeEvent(data.dayOfYear, data.milliseconds))
  dispatch(setEvents(data.monthObj))

}




const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MONTH:
      return {
        ...state,
        monthObj: action.monthObj,

      }
    case REMOVE_MONTH:
      delete state.monthObj[action.dayOfYear].events[action.millisecond]
      return state
    default:
      return state;
  }
};

export default eventsReducer;
