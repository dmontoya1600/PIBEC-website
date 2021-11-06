import { csrfFetch } from './csrf';

export const UPDATE_ARRAY ='embedd/upateArray';

const setEmbeddedCode = (location, array) => {
  return {
    type: UPDATE_ARRAY,
    array,
    location,
  };
};


export const getEmbeddedCode = (location, position = 0) => async dispatch => {
  const response = await csrfFetch(`api/embedded/${location}`)
  const data = await response.json()
//   dispatch(setEmbeddedCode(location, data.array))
  /*
    RESPONSE SHOULD RETURN AN ARRAY OF ALL THE EMBEDDED CODE FROM THAT LOCATION
    RESPONSE SHOULD BE AN ARRAY OF EMBEDDED CODE WITH THEIR POSITION AND LOCATION

  */
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
  console.log('RESPOSNSE FROM EMBEDD',data)
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
