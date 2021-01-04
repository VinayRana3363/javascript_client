import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  table: {
    minWidth: 650,
  },
  container: {
    width: '90%',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'margin-top': 10,
  },
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    background: '#FFFFFF',
    '&:hover': {
      background: '#f1f1f1',
      cursor: 'pointer',
    },
  },
  link: {
    textDecoration: 'none',
  },
  pagination: {
    'margin-right': '60px',
  },
});

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: 'asc',
    };
  }

  columnHead = (columnData) => (
    <>
      {columnData.map((tableHead) => this.renderTableHead(tableHead))}
    </>
  )

  columnField = (columnData, columnHead, actions) => (
    <>
      {columnData.map((tableData) => this.renderTableField(tableData, columnHead, actions))}
    </>
  )

  handleSort = (field) => () => {
    const { onSort } = this.props;
    onSort(field);
  }

  handleSelect = (id) => () => {
    const { onSelect } = this.props;
    onSelect(id);
  }

  renderTableHead = (tableHead) => {
    const { label, align, field } = tableHead;
    const { direction } = this.state;
    const { order, orderBy } = this.props;
    return (
      <TableCell key={field} align={align} sortDirection={direction}>
        <TableSortLabel
          active={orderBy === field}
          direction={order}
          onClick={this.handleSort(field)}
        >
          {label}
        </TableSortLabel>
      </TableCell>
    );
  }

  renderTableField = (tableField, columnHead, actions) => {
    const { id } = tableField;
    const { classes } = this.props;
    return (
      <TableRow key={id} className={classes.root} onClick={this.handleSelect(id)}>
        {
          columnHead.map((data) => this.accordingColumnHead(data, tableField))
        }
        {
          actions.map((data) => this.handleIcons(data, tableField))
        }
      </TableRow>

    );
  }

  setDirection = () => {
    const { direction } = this.state;
    if (direction === 'asc') return this.setState({ direction: 'desc' });
    return this.setState({ direction: 'asc' });
  }

  accordingColumnHead = (data, tableField) => {
    const { field, align, format } = data;
    return (
      <TableCell key={`${tableField.id}+${tableField[field]}`} align={align}>{(format) ? format(tableField[field]) : tableField[field]}</TableCell>
    );
  }

  handleIcons = (data, tableField) => (
    <TableCell key={Math.random()} onClick={(e) => data.handler(e, tableField)}>
      {data.icon}
    </TableCell>
  )

  render() {
    const {
      classes, data, column, page, onChangePage, actions,
    } = this.props;
    return (
      <>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                { this.columnHead(column)}
              </TableRow>
            </TableHead>
            <TableBody>
              { this.columnField(data, column, actions)}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.pagination}
          component="div"
          count={100}
          page={page}
          onChangePage={onChangePage}
          rowsPerPage={10}
          rowsPerPageOptions={[]}
        />
      </>
    );
  }
}

BasicTable.defaultProps = {
  order: 'asc',
  orderBy: '',
  onSort: {},
  onSelect: {},
  onChangePage: {},
  page: 0,
};

BasicTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default withStyles(styles)(BasicTable);
