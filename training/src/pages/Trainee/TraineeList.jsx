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
import callApi from '../../libs/utils/api';
import { IsLoadingHOC } from '../../components/HOC';
import { SnackBarContext } from '../../contexts';

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing(2),
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
      totalCount: 0,
      openDeleteDialog: false,
      deleteDialogData: null,
      openEditDialog: false,
      editDialogData: null,
      traineesDataBase: [],
    };
  }

  componentDidMount() {
    const { setLoading } = this.props;
    setLoading(true);
    this.traineesFromDataBase();
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

  handleSort = (field) => {
    const { order, orderBy } = this.state;
    let newOrder = 'asc';
    if (orderBy === field && order === 'asc') {
      newOrder = 'desc';
    }
    this.setState({
      order: newOrder,
      orderBy: field,
    }, () => {
      this.traineesFromDataBase();
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
    this.setState({ page: newPage }, () => {
      this.traineesFromDataBase();
    });
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
    this.setState({ openDeleteDialog: false }, () => {
      this.traineesFromDataBase();
    });
  }

  handleEditIconClose = () => {
    this.setState({ openEditDialog: false }, () => {
      this.traineesFromDataBase();
    });
  }

  traineesFromDataBase = async () => {
    const { page, orderBy } = this.state;
    const { setLoading } = this.props;
    await callApi(`/trainee/?skip=${page * 5}&limit=${5}&sort=${orderBy}`, 'GET')
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          this.setState({ traineesDataBase: res.data.data, totalCount: res.data.TraineeCount + 1 });
        }, 500);
        return res.data.data;
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        return trainees;
      });
  }

  render() {
    const { classes } = this.props;
    const {
      // eslint-disable-next-line max-len
      order, orderBy, page, deleteDialogData, openDeleteDialog, openEditDialog, editDialogData, traineesDataBase, totalCount,
    } = this.state;
    const { currentState } = this.props;
    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <div>
            {
              (!currentState) && (
                <div>
                  <div className={classes.main}>
                    <AddDialog callTrainees={this.traineesFromDataBase} />
                  </div>
                  <Table
                    id={value}
                    data={traineesDataBase}
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
                    count={totalCount}
                    page={page}
                    onChangePage={this.handleChangePage}
                  />
                </div>
              )
            }
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
          </div>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setLoading: PropTypes.func.isRequired,
  currentState: PropTypes.bool.isRequired,
};

export default withStyles(styles)(IsLoadingHOC(TraineeList));
