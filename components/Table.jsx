import React from 'react';
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

const CaptiTable = ({ data, title }) => (
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
        {_.map(_.take(data, 10), (row, id) => (
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

CaptiTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  title: PropTypes.string.isRequired,
};

export default CaptiTable;
