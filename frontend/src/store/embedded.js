import { csrfFetch } from './csrf';

export const ADD_IMAGE ='images/addImage';

const setImages = (location, array) => {
  return {
    type: ADD_IMAGE,
    array,
    location,
  };
};


export const getEmbeddedCode = (location, position = 0) => async dispatch => {
  const response = await csrfFetch(`api/embedded/${location}`)
  const data = await response.json()
  dispatch(setEmbeddedCode(location, data.array))
  /*
    RESPONSE SHOULD RETURN AN ARRAY OF ALL THE EMBEDDED CODE FROM THAT LOCATION
    RESPONSE SHOULD BE AN ARRAY OF EMBEDDED CODE WITH THEIR POSITION AND LOCATION

  */
}

export const createUpdateCode = (location, position = 0) => async dispatch => {
  const response = await csrfFetch(`api/embedded/${location}`)
  const data = await response.json()
  dispatch(setEmbeddedCode(location, data.array))
}



export const removeImage = (id, location) => async dispatch => {
  const response = await csrfFetch (`api/images/${id}`, {
    method: 'DELETE'
  })
  const data = await response.json()
  dispatch(setImages(location, data.array))

}

export const uploadImage = (image, location) => async dispatch => {
  const formData = new FormData()

  if(image){
    formData.append('image', image)
  }
  formData.append('location', location)

    const response = await csrfFetch('/api/images', {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData, location
    });
    const data = await response.json();

    dispatch(setImages(location, data.array));
    // return response;
  };




const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        [action.location]: action.array,

      }
    default:
      return state;
  }
};

export default imagesReducer;
