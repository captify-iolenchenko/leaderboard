const initialState = {
  auth: false,
};

export default (state = initialState, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.value };
    default:
      return state;
  }
};
