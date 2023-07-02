const initialState = {};

// const ADD_DETAIL = 'DetailInfo/ADD_DETAIL'

// export const addDetail = (payload)=>{
//   return {

//   }
// }

const editDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'EDIT_DETAIL':
      console.log(state, action);
      return action.payload;
    // case ADD_DETAIL:
    // return state
    default:
      return state;
  }
};

export default editDetail;
