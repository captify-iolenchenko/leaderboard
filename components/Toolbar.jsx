import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';

import getData from './controller/getData';

const TBar = ({ auth, isSigned, dispatch }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
      <ToolbarTitle text="LeaderBoard Captify Sports Day" style={{ paddingLeft: 10 }} />
      {isSigned ? <FlatButton
        label="Refresh"
        primary
        onTouchTap={() => getData(auth.gapi, dispatch)}
      /> : null}
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  isSigned: state.auth,
}))(TBar);
