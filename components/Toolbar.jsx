import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import getData from './controller/getData';

const TBar = ({ auth, isSigned, dispatch, activities, selectedActivity, locations, selectedLocation }) => (
  <Toolbar>
    <ToolbarGroup firstChild>
      {isSigned ? [
        <FlatButton
          label="Refresh"
          primary
          onTouchTap={() => getData(auth.gapi, dispatch)}
          key="1"
        />,
        <SelectField
          floatingLabelText="Activity"
          value={selectedActivity}
          onChange={(event, index, value) => dispatch({ type: 'SET_SELECTED_ACTIVITY', value })}
          style={{ width: 100 }}
          key="2"
        >
          {_.map(activities, (activity, id) => (
            <MenuItem value={id} primaryText={activity} key={activity} />
          ))}
        </SelectField>,
        <SelectField
          floatingLabelText="Location"
          value={selectedLocation}
          onChange={(event, index, value) => dispatch({ type: 'SET_SELECTED_LOCATION', value })}
          style={{ width: 100 }}
          key="3"
        >
          {_.map(locations, (location, id) => (
            <MenuItem value={id} primaryText={location} key={location} />
          ))}
        </SelectField>,
      ] : null}
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
  activities: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedActivity: PropTypes.number.isRequired,
  selectedLocation: PropTypes.number.isRequired,
};

export default connect(state => ({
  isSigned: state.auth,
  activities: state.activities,
  locations: state.locations,
  selectedActivity: state.selectedActivity,
  selectedLocation: state.selectedLocation,
}))(TBar);
