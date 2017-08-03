/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function getData(gapi, dispatch) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1HFmLCCb36p2Z9k5KTzIfjWbnjKFSTMLltiAmWklHb7E',
    range: 'Form responses 1!A2:F',
  }).then((response) => {
    const range = response.result;
    dispatch({ type: 'SET_DATA', value: range.values });
    return range.values;
  }, () => {
    dispatch({ type: 'ADD_SNACKBAR_MESSAGE', value: 'Oops, looks like your account is not from Captify :sad_face:' });
  });
}

export default getData;
