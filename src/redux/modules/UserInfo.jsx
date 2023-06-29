const UPLOAD_IMG = 'UPLOAD_IMG';

export const uploadImg = (payload) => {
  return {
    type: UPLOAD_IMG,
    payload,
  };
};

const initialState = [];

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_IMG:
      return action.payload;

    default:
      return state;
  }
};

export default userInfo;
