import { csrfFetch } from './csrf';


export const UPDATE_MONTH ='events/updateMonth';

const setEvents = (monthObj) => {
  return {
    type: UPDATE_MONTH,
    monthObj
  };
};


export const getEvents = () => async dispatch => {

  const response = await csrfFetch(`api/events/`)
  const data = await response.json()
  console.log('it worked!',data.monthObj);
  dispatch(setEvents(data.monthObj))

}

export const createEvent = (dayOfYear, eventTitle, eventTime) => async dispatch => {
  const response = await csrfFetch(`api/events/`, {
      method: 'POST',
      body: JSON.stringify({
        dayOfYear,
        eventTitle,
        eventTime,
      })
  });

  const data = await response.json()
//   dispatch(setEvents(location, data.array))
}





const eventsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MONTH:
      return {
        ...state,
        monthObj: action.monthObj,

      }
    default:
      return state;
  }
};

export default eventsReducer;
