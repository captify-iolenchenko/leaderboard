import gca from 'google-client-api';

import getData from './getData';

const okHandler = (gapi, dispatch) => {
  dispatch({ type: 'SET_AUTH', value: true });
  getData(gapi, dispatch);
};

const nokHandler = (dispatch) => {
  dispatch({ type: 'SET_AUTH', value: false });
  dispatch({ type: 'SET_DATA', value: null });
};

const auth = gca();
const authCall = store => auth.then((gapi) => {
  const CLIENT_ID = '1075332311102-it0g093aur5cnqn1isj2kr0ola2jv7rv.apps.googleusercontent.com';

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      okHandler(gapi, store.dispatch);
    } else {
      nokHandler(store.dispatch);
    }
    return null;
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  const initClient = resolve => () => {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES,
    }).then(() => {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      resolve(updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get()));
    });
  };

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    return new Promise((resolve) => {
      gapi.load('client:auth2', initClient(resolve));
    });
  }

  return handleClientLoad().then(() => {
    const isSigned = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (isSigned) {
      okHandler(gapi, store.dispatch);
    } else {
      nokHandler(store.dispatch);
    }
    return {
      handleAuthClick,
      handleSignoutClick,
      gapi,
    };
  });
});

export default authCall;
