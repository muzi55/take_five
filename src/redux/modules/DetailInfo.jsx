const initialState = {};

const editDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_DETAIL':
      return action.payload;
    default:
      return state;
  }
};

export default editDetail;
