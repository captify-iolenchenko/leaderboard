import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

const TBar = ({ auth, isSigned }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <ToolbarTitle text="LeaderBoard" style={{ paddingLeft: 10 }} />
    </ToolbarGroup>
    <ToolbarGroup lastChild>
      {isSigned ? <FlatButton
        label="Logout"
        primary
        onTouchTap={auth.handleSignoutClick}
      /> : null}
    </ToolbarGroup>
  </Toolbar>
);

TBar.propTypes = {
  auth: PropTypes.shape({
    handleSignoutClick: PropTypes.func.isRequired,
  }).isRequired,
  isSigned: PropTypes.bool.isRequired,
};

export default connect(state => ({
  isSigned: state.auth,
}))(TBar);
