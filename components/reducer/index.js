import _ from 'lodash';

const initialState = {
  auth: false,
  data: {},
  openSnack: false,
  messagesSnack: [],
};

const setData = (state, value) => {
  const data = _.groupBy(value, '4');
  const sorted = _.mapValues(data, chart => _.reverse(_.sortBy(chart, row => +row[3])));
  return {
    ...state,
    data: sorted,
  };
};

export default (state = initialState, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.value };
    case 'SET_DATA':
      return setData(state, action.value);
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
