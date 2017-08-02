import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: !props.response.isSigned,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { auth, response } = this.props;
    const actions = [
      <FlatButton
        label="Logout"
        primary
        onTouchTap={auth.handleSignoutClick}
      />,
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
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        Please login with your Captify account to see LeaderBoard
      </Dialog>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.shape({}).isRequired,
  response: PropTypes.shape({
    isSigned: PropTypes.bool.isRequired,
  }).isRequired,
};
