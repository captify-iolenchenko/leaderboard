import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme();

const Snack = ({ open, message, dispatch }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={3000}
      onRequestClose={() => dispatch({ type: 'POP_SNACKBAR_MESSAGE' })}
    />
  </MuiThemeProvider>
);

Snack.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    open: state.openSnack,
    message: state.messagesSnack[0] || '',
  };
}

export default connect(mapStateToProps)(Snack);
