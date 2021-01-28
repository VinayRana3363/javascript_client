import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import TraineeList from './TraineeList';
import TraineeDetails from './TraineeDetails';
import apolloClient from '../../libs/apollo-client';

function Trainee(props) {
  const { match: { path } } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <Switch>
        <Route exact path={path} component={TraineeList} />
        <Route exact path={`${path}/:id`} component={TraineeDetails} />
      </Switch>
    </ApolloProvider>
  );
}
Trainee.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Trainee;
