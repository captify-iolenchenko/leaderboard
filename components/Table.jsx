import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const CaptiTable = ({ data, title, selectedLocation, locations }) => {
  const filtered = selectedLocation === 0 ? data : _.filter(data, row => row[5] === locations[selectedLocation]);
  return (
    <div>
      <p>{title}</p>
      <Table selectable={false}>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>#</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Score</TableHeaderColumn>
            <TableHeaderColumn>Location</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {_.map(_.take(filtered, 10), (row, id) => (
            <TableRow key={row[0]}>
              <TableRowColumn>{id + 1}</TableRowColumn>
              <TableRowColumn>{row[2]}</TableRowColumn>
              <TableRowColumn>{row[3]}</TableRowColumn>
              <TableRowColumn>{row[5]}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

CaptiTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  title: PropTypes.string.isRequired,
  selectedLocation: PropTypes.number.isRequired,
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(state => ({
  selectedLocation: state.selectedLocation,
  locations: state.locations,
}))(CaptiTable);
