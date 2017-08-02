import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';
import FlatButton from 'material-ui/FlatButton';

function App({ children, auth, dispatch, isSigned }) {
  return (
    <AppContainer>
      <MuiThemeProvider>
        <div>
          {isSigned ? <FlatButton
            label="Logout"
            primary
            onTouchTap={auth.handleSignoutClick(dispatch)}
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
  dispatch: PropTypes.func.isRequired,
  isSigned: PropTypes.bool.isRequired,
};

export default connect((state) => {
  console.log(state, 'state');
  return ({
    isSigned: state.auth,
  });
})(App);
