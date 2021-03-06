import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore } from 'redux';

import reducer from './components/reducer';
import App from './components/App';
import PageNotFound from './components/PageNotFound';
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


const routes = auth => (
  // onEnter hook checks if a redirect is needed before App component is loaded
  <Route
    path="/"
    mapMenuTitle="App"
    component={props => <App auth={auth}>{props.children}</App>}
    onEnter={checkForRedirect}
  >
    <Route
      path="/leaderboard"
      mapMenuTitle="App"
      component={props => <App auth={auth}>{props.children}</App>}
      onEnter={checkForRedirect}
    />
    <Route
      path="/leaderboard/"
      mapMenuTitle="App"
      component={props => <App auth={auth}>{props.children}</App>}
      onEnter={checkForRedirect}
    />
    <Route path="*" mapMenuTitle="Page Not Found" component={PageNotFound} />
  </Route>
);

const Root = ({ store, auth }) => (
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes(auth)}
    />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  auth: PropTypes.shape({}).isRequired,
};

const store = createStore(reducer);

authController(store).then(auth => render(
  <Root store={store} auth={auth} />,
  document.getElementById('root'),
));
