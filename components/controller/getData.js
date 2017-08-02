/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function getData(gapi, dispatch) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1ZO-Hrj8X2WXJG028AqHrRPWMHdmoJS9JfzKZSlF-8n8',
    range: 'Form responses 1!A2:E',
  }).then((response) => {
    const range = response.result;
    dispatch({ type: 'SET_DATA', value: range });
    return range.values;
  }, () => {
    dispatch({ type: 'ADD_SNACKBAR_MESSAGE', value: 'Oops, looks like your account is not from Captify :sad_face:' });
  });
}

export default getData;
