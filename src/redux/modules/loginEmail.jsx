const initiaState = '';

const LOGIN_EMAIL = 'loginemail/ligonEMAIL';

export const loginmail = (payload) => {
  return {
    type: LOGIN_EMAIL,
    payload,
  };
};

export const loginsubmit = (state = initiaState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return (state = action.payload);
    default:
      return state;
  }
};

export default loginsubmit;
