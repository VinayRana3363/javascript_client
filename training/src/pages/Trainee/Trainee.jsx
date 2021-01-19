import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetails';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.path} component={TraineeList} />
        <Route exact path={`${match.path}/:id`} component={TraineeDetails} />
      </Switch>
    );
  }
}

Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Trainee;
