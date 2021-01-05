import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import moment from 'moment';
import trainees from './data/trainee';
import { Table } from '../../components';
import { AddDialog, DeleteDialog, EditDialog } from './components';

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing.unit * 2,
  },
  icons: {},
});

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'name',
      page: 0,
      openDeleteDialog: false,
      deleteDialogData: null,
      openEditDialog: false,
      editDialogData: null,
    };
  }

  // eslint-disable-next-line arrow-body-style
  renderTrainees = () => {
    return (
      <ul>
        {
          trainees.map((trainee) => this.renderTrainee(trainee))
        }
      </ul>
    );
  }

  renderTrainee = (trainee) => {
    const { match } = this.props;
    return (
      <li key={trainee.id}>
        <Link to={`${match.path}/${trainee.id}`}>
          {trainee.name}
        </Link>
      </li>
    );
  }

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    let newOrder = 'asc';
    if (orderBy === field && order === 'asc') {
      newOrder = 'desc';
    }
    this.setState({
      order: newOrder,
      orderBy: field,
    });
  }

  handleSelect = (id) => {
    const { match, history } = this.props;
    return (
      history.push(`${match.path}/${id}`)
    );
  }

  formatDate = (date) => (moment(date).format('dddd, MMMM Do, YYYY h:mm:ss A'))

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleEditIcon = (e, data) => {
    e.stopPropagation();
    this.setState({ openEditDialog: true, editDialogData: data });
  }

  handleDeleteIcon = (e, data) => {
    e.stopPropagation();
    this.setState({ openDeleteDialog: true, deleteDialogData: data });
  }

  handleDeleteIconClose = () => {
    this.setState({ openDeleteDialog: false });
  }

  handleEditIconClose = () => {
    this.setState({ openEditDialog: false });
  }

  render() {
    const { classes } = this.props;
    const {
      order, orderBy, page, deleteDialogData, openDeleteDialog, openEditDialog, editDialogData,
    } = this.state;
    return (
      <>
        <div className={classes.main}>
          <AddDialog />
        </div>
        <Table
          data={trainees}
          column={[
            {
              field: 'name',
              label: 'Name',
            },
            {
              field: 'email',
              label: 'Email Address',
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: this.formatDate,
            },
          ]}
          actions={[
            {
              icon: <EditIcon className={classes.icons} />,
              handler: this.handleEditIcon,
            },
            {
              icon: <DeleteIcon className={classes.icons} />,
              handler: this.handleDeleteIcon,
            },
          ]}
          order={order}
          orderBy={orderBy}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
          count={100}
          page={page}
          onChangePage={this.handleChangePage}
        />
        <DeleteDialog
          openDialog={openDeleteDialog}
          onClose={this.handleDeleteIconClose}
          data={deleteDialogData}
        />
        {
          openEditDialog && (
            <EditDialog
              editOpen={openEditDialog}
              onClose={this.handleEditIconClose}
              details={editDialogData}
            />
          )
        }
      </>
    );
  }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeList);
