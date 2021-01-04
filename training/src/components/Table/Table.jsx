import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const styles = () => ({
  table: {
    minWidth: 650,
  },
  container: {
    width: '90%',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'margin-top': 10,
  },
});

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line arrow-body-style
  columnHead = (columnData) => {
    return (
      <>
        {columnData.map((tableHead) => this.renderTableHead(tableHead))}
      </>
    );
  }

  // eslint-disable-next-line arrow-body-style
  columnField = (columnData, columnHead) => {
    return (
      <>
        {columnData.map((tableData) => this.renderTableField(tableData, columnHead))}
      </>
    );
  }

  renderTableHead = (tableHead) => {
    const { label, align } = tableHead;
    return (
      <TableCell align={align}>{label}</TableCell>
    );
  }

  renderTableField = (tableField, columnHead) => {
    const { id } = tableField;
    return (
      <TableRow key={id}>
        {
          columnHead.map((data) => this.accordingColumnHead(data, tableField))
        }
      </TableRow>
    );
  }

  accordingColumnHead = (data, tableField) => {
    const { field, align } = data;
    return (
      <TableCell align={align}>{tableField[field]}</TableCell>
    );
  }

  render() {
    const { classes, data, column } = this.props;

    return (
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              { this.columnHead(column)}
            </TableRow>
          </TableHead>
          <TableBody>
            { this.columnField(data, column)}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

BasicTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(BasicTable);
