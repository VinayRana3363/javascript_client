import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import trainees from './data/trainee';
import { Table } from '../../components';

const styles = (theme) => ({
  main: {
    marginTop: theme.spacing.unit * 2,
  },
});

class TraineeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.main}>
          <Button
            variant="outlined"
            color="primary"
          >
            Add Trainee List
          </Button>
        </div>
        <Table
          data={trainees}
          column={[
            {
              field: 'name',
              label: 'Name',
              align: 'center',
            },
            {
              field: 'email',
              label: 'Email Address',
            },
          ]}
        />
        { this.renderTrainees() }
      </>
    );
  }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(TraineeList);
