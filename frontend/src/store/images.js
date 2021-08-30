import { csrfFetch } from './csrf';

export const ADD_IMAGE ='images/addImage';

const setImages = (location, array) => {
  return {
    type: ADD_IMAGE,
    array,
    location,
  };
};


export const getImages = (location) => async dispatch => {
  const response = await csrfFetch(`api/images/${location}`)
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
