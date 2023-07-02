const GET_USER_ID = 'GET_USER_ID';

export const getUserId = (payload) => {
  return {
    type: GET_USER_ID,
    payload,
  };
};

const initialState = [];

const userId = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ID:
      return action.payload;
    default:
      return state;
  }
};

export default userId;
