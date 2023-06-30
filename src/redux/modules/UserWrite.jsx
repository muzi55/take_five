const GET_USER_WRITE = "GET_USER_WRITE";
const DELETE_USER_WRITE = "DELETE_USER_WRITE";

export const getUserWrite = (payload) => {
  return {
    type: GET_USER_WRITE,
    payload,
  };
};

const initialState = [];

const userWrite = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_WRITE:
      return action.payload;
    default:
      return state;
  }
};

export default userWrite;
