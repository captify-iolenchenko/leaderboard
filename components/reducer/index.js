import _ from 'lodash';

const initialState = {
  auth: false,
  data: {},
  openSnack: false,
  messagesSnack: [],
  activities: ['Any'],
  locations: ['Any'],
  selectedActivity: 0,
  selectedLocation: 0,
};

const setData = (state, value) => {
  const data = _.groupBy(value, '4');
  const sorted = _.mapValues(data, chart => _.reverse(_.sortBy(chart, row => +row[3])));
  const activities = ['Any', ..._.keys(sorted)];
  const locations = ['Any', ..._.keys(_.groupBy(value, '5'))];
  return {
    ...state,
    data: sorted,
    activities,
    locations,
    selectedActivity: _.includes(activities, state.selectedActivity) ? state.selectedActivity : 0,
    selectedLocation: _.includes(locations, state.selectedLocation) ? state.selectedLocation : 0,
  };
};

export default (state = initialState, action) => {
  console.log(action, 'action');
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.value };
    case 'SET_SELECTED_ACTIVITY':
      return { ...state, selectedActivity: action.value };
    case 'SET_SELECTED_LOCATION':
      return { ...state, selectedActivity: action.value };
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
