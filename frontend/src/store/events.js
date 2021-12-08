import { csrfFetch } from './csrf';


export const UPDATE_MONTH ='embedd/upateArray';

const setEvents = (location, array) => {
  return {
    type: UPDATE_MONTH,
    array,
    location,
  };
};


export const getEvents = () => async dispatch => {

  const response = await csrfFetch(`api/events/`)
  const data = await response.json()
//   dispatch(setEvents(location, data.array))

}

export const updateEmbeddedCode = (date, eventName, eventTime) => async dispatch => {
  const response = await csrfFetch(`api/events/`, {
      method: 'POST',
      body: JSON.stringify({
        date,
        eventName,
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
