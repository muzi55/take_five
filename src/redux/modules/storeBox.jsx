const initialState = {
  list: [],
  usre: [],
};

const SPRAYLIST = 'storebox/SPRAYLIST';

export const sprayList = (payload) => {
  return {
    type: SPRAYLIST,
    payload,
  };
};

const lists = (state = initialState, action) => {
  switch (action.type) {
    case SPRAYLIST:
      return state;
    default:
      return state;
  }
};

export default lists;
