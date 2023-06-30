const GET_USER_PHOTO = "GET_USER_PHOTO";

export const getUserPhoto = (payload) => {
  return {
    type: GET_USER_PHOTO,
    payload,
  };
};

const initialState = [];

const userPhoto = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PHOTO:
      return action.payload;
    default:
      return state;
  }
};

export default userPhoto;
