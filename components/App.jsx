import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';

import Snack from './Snack';
import Toolbar from './Toolbar';

function App({ auth }) {
  return (
    <AppContainer>
      <MuiThemeProvider>
        <div style={{ margin: '0 auto', position: 'relative', width: 700 }}>
          <img src="captify-logo.png" alt="Captify" width="500" height="150" style={{ margin: '0 100px' }} />
          <Toolbar auth={auth} />
          <Snack />
        </div>
      </MuiThemeProvider>
    </AppContainer>
  );
}

App.propTypes = {
  auth: PropTypes.shape({
    handleSignoutClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(state => ({
  isSigned: state.auth,
}))(App);
