import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';
import FlatButton from 'material-ui/FlatButton';

function App({ children, auth, response }) {
  return (
    <AppContainer>
      <MuiThemeProvider>
        <div>
          {response.isSigned ? <FlatButton
            label="Logout"
            primary
            onTouchTap={auth.handleSignoutClick}
          /> : null}
          {children}
        </div>
      </MuiThemeProvider>
    </AppContainer>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  auth: PropTypes.shape({
    handleSignoutClick: PropTypes.func.isRequired,
  }).isRequired,
  response: PropTypes.shape({
    isSigned: PropTypes.bool.isRequired,
  }).isRequired,
};

export default App;
