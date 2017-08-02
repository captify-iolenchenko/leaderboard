import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const Auth = ({ auth, dispatch, isSigned }) => {
  const actions = [
    <FlatButton
      label="Log in"
      primary
      keyboardFocused
      onTouchTap={auth.handleAuthClick}
    />,
  ];

  return (
    <Dialog
      title="Captify Sports Day"
      actions={actions}
      modal
      open={!isSigned}
    >
      Please login with your Captify account to see LeaderBoard
    </Dialog>
  );
};

Auth.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  isSigned: PropTypes.bool.isRequired,
};

export default connect(state => ({ isSigned: state.auth }))(Auth);
