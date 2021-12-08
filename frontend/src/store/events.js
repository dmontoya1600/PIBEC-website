import { csrfFetch } from './csrf';


export const UPDATE_ARRAY ='embedd/upateArray';

const setEmbeddedCode = (location, array) => {
  return {
    type: UPDATE_ARRAY,
    array,
    location,
  };
};


export const getEvents = (location, position = 0) => async dispatch => {

  const response = await csrfFetch(`api/events/`)
  const data = await response.json()
  dispatch(setEmbeddedCode(location, data.array))

}

export const updateEmbeddedCode = (embedded, location, position = 0) => async dispatch => {
  const response = await csrfFetch(`api/embedded/`, {
      method: 'POST',
      body: JSON.stringify({
        embedded,
        location
      })
  });

  const data = await response.json()
  dispatch(setEmbeddedCode(location, data.array))
}





const embeddedReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ARRAY:
      return {
        ...state,
        [action.location]: action.array,

      }
    default:
      return state;
  }
};

export default embeddedReducer;
