const initialState = '최신순';

const CHANGELISTITEM = 'list/CHANGELISTITEM';

export const changeListItem = () => {
  type: CHANGELISTITEM;
};

const lists = (state = initialState, action) => {
  // console.log(state);
  switch (action.type) {
    case CHANGELISTITEM:
      return [...state];
    default:
      return state;
  }
};

export default lists;
