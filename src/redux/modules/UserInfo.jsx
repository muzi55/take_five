const GET_USER_INFO = "GET_USER_INFO";

export const getUserInfo = (payload) => {
  return {
    type: GET_USER_INFO,
    payload,
  };
};

const initialState = [];

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default userInfo;
