import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';

import reducer from './components/reducer';
import App from './components/App';
import PageNotFound from './components/PageNotFound';
import Auth from './components/Auth';
import authController from './components/controller/auth';

injectTapEventPlugin();

function parseRedirectQuery(query, replace) {
  const redirectTo = {};

  if (typeof query.pathname === 'string' && query.pathname !== '') {
    redirectTo.pathname = query.pathname;
  }

  if (typeof query.query === 'string' && query.query !== '') {
    const queryObject = {};
    query.query.split('&').map(q => q.split('=')).forEach((arr) => {
      queryObject[arr[0]] = arr.slice(1).join('=');
    });
    redirectTo.query = queryObject;
  }

  if (typeof query.hash === 'string' && query.hash !== '') {
    redirectTo.hash = `#${query.hash}`;
  }

  replace(redirectTo);
}

function checkForRedirect(nextState, replace) {
  const location = nextState.location;
  if (location.query.redirect === 'true') {
    parseRedirectQuery(location.query, replace);
  }
}


const routes = (auth, response) => (
  // onEnter hook checks if a redirect is needed before App component is loaded
  <Route
    path="/"
    mapMenuTitle="App"
    component={props => <App auth={auth} response={response}>{props.children}</App>}
    onEnter={checkForRedirect}
  >
    <IndexRoute component={() => <Auth auth={auth} response={response} />} />

    <Route path="*" mapMenuTitle="Page Not Found" component={PageNotFound} />
  </Route>
);

const Root = ({ store, auth, response }) => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes(auth, response)}
    />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
  response: PropTypes.shape({}).isRequired,
};

const store = createStore(reducer);

authController().then(auth => auth.response.then(response => render(
  <Root store={store} response={response} auth={auth} />,
  document.getElementById('root'),
)));
