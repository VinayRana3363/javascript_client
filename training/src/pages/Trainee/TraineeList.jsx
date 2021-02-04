/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import moment from 'moment';
import trainees from './data/trainee';
import { Table } from '../../components';
import { AddDialog, DeleteDialog, EditDialog } from './components';
import callApi from '../../libs/utils/api';
import { IsLoadingHOC } from '../../components/HOC';
import { SnackBarContext } from '../../contexts';
import { STORED_USERS } from './query';

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

  componentDidMount() {
    const { setLoading } = this.props;
    setLoading(true);
  }

  selfCheck = async (value) => {
    const { deleteDialogData } = this.state;
    const { originalId } = deleteDialogData;
    await callApi('/user/me', 'GET')
      .then((res) => {
        if (res.data.user.originalId === originalId) {
          this.handleDeleteIconClose();
          value("Can't Delete your self", 'error');
        }
      });
  }

  renderTrainees = () => (
    <ul>
      {
        trainees.map((trainee) => this.renderTrainee(trainee))
      }
    </ul>
  )

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

  handleSort = (field, refetch) => {
    const { order, orderBy, page } = this.state;
    let newOrder = 'asc';
    if (orderBy === field && order === 'asc') {
      newOrder = 'desc';
    }
    this.setState({
      order: newOrder,
      orderBy: field,
    }, () => {
      refetch({ skip: String(page * 5), limit: String(5), sort: this.state.orderBy });
    });
  }

  handleSelect = (id) => {
    const { match, history } = this.props;
    return (
      history.push(`${match.path}/${id}`)
    );
  }

  formatDate = (date) => (moment(date).format('dddd, MMMM Do, YYYY h:mm:ss A'))

  handleChangePage = (refetch) => (event, newPage) => {
    this.setState({ page: newPage }, () => {
      refetch({ skip: String(newPage * 5), limit: String(5), sort: this.state.orderBy });
    });
  };

  handleEditIcon = (e, data) => {
    e.stopPropagation();
    this.setState({ openEditDialog: true, editDialogData: data });
  }

  handleDeleteIcon = (e, data, value) => {
    e.stopPropagation();
    this.setState({ openDeleteDialog: true, deleteDialogData: data }, () => {
      this.selfCheck(value);
    });
  }

  handleDeleteIconClose = (data, refetch) => {
    const { page } = this.state;
    this.setState({ openDeleteDialog: false }, () => {
      if (data.length === 1) {
        this.setState({ page: page - 1 }, () => {
          refetch({ skip: String((page - 1) * 5), limit: String(5), sort: this.state.orderBy });
        });
      } else refetch();
    });
  }

  handleEditIconClose = () => {
    this.setState({ openEditDialog: false });
  }

  render() {
    const { classes } = this.props;
    const {
      // eslint-disable-next-line max-len
      order, orderBy, page, deleteDialogData, openDeleteDialog, openEditDialog, editDialogData,
    } = this.state;
    const { currentState, setLoading } = this.props;

    const {
      data: {
        getAllTrainees: { data = {}, TraineeCount = 0 } = {},
        refetch,
      },
    } = this.props;
    if (data) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setLoading(true);
    }
    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <div>
            {
              (!currentState && data.length > 0) && (
                <div>
                  <div className={classes}>
                    <AddDialog refetchQueries={refetch} />
                  </div>
                  <Table
                    id={value}
                    data={data}
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
                        icon: <EditIcon className={classes} />,
                        handler: this.handleEditIcon,
                      },
                      {
                        icon: <DeleteIcon className={classes} />,
                        handler: this.handleDeleteIcon,
                      },
                    ]}
                    order={order}
                    orderBy={orderBy}
                    onSort={this.handleSort}
                    refetchQueries={refetch}
                    onSelect={this.handleSelect}
                    // eslint-disable-next-line radix
                    count={parseInt(TraineeCount) + 1}
                    page={page}
                    onChangePage={this.handleChangePage(refetch)}
                  />
                </div>
              )
            }
            <DeleteDialog
              openDialog={openDeleteDialog}
              onClose={() => this.handleDeleteIconClose(data, refetch)}
              data={deleteDialogData}
              refetchQueries={refetch}
            />
            {
              openEditDialog && (
                <EditDialog
                  editOpen={openEditDialog}
                  onClose={this.handleEditIconClose}
                  details={editDialogData}
                  refetchQueries={refetch}
                />
              )
            }
          </div>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setLoading: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
};

export default compose(IsLoadingHOC, graphql(STORED_USERS,
  {
    options: { variables: { skip: '0', limit: '5', sort: 'name' } },
  }))(TraineeList);
