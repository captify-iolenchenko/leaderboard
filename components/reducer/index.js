const initialState = {
  auth: false,
  data: null,
  openSnack: false,
  messagesSnack: [],
};

export default (state = initialState, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.value };
    case 'SET_DATA':
      return { ...state, data: action.value };
    case 'ADD_SNACKBAR_MESSAGE':
      return {
        ...state,
        openSnack: true,
        messagesSnack: [...state.messagesSnack, action.value],
      };
    case 'POP_SNACKBAR_MESSAGE':
      return {
        ...state,
        openSnack: state.messagesSnack.length > 1,
        messagesSnack: state.messagesSnack.slice(1),
      };
    default:
      return state;
  }
};
