import { csrfFetch } from './csrf';

export const ADD_IMAGE ='images/addImage';

const addImage = (location, array) => {
  return {
    type: ADD_IMAGE,
    array,
    location,
  };
};

// const removeUser = () => {
//   return {
//     type: REMOVE_USER,
//   };
// };

export const uploadImage = (image, location) => async dispatch => {
    const response = await csrfFetch('/api/images');
    // const data = await response.json();
    const data = {
      location: 'homepage',
      array: [1, 2, 3],
    }
    dispatch(addImage(data.location, data.array));
    // return response;
  };




const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      console.log('DISPATCH TRIGGERSE')
      return {
        ...state,
        [action.location]: action.array,

      }
    default:
      return state;
  }
};

export default imagesReducer;
