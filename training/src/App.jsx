import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/react-components';
import {
  Login, TextFieldDemo, InputDemo, ChildrenDemo, NoMatch, Trainee,
} from './pages';
// import { TraineeList } from './pages/Trainee';
import { AuthRoute, PrivateRoute } from './routes';
import { NavBar } from './layouts';
import { SnackBarProvider } from './contexts';
import apolloClient from './libs/apollo-client';

function App() {
  return (
    <>
      <SnackBarProvider>
        <ApolloProvider client={apolloClient}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <AuthRoute path="/login" component={Login} />
              <PrivateRoute path="/dashboard" component={NavBar} />
              <PrivateRoute path="/text-field-demo" component={TextFieldDemo} />
              <PrivateRoute path="/input-demo" component={InputDemo} />
              <PrivateRoute path="/children-demo" component={ChildrenDemo} />
              <PrivateRoute path="/trainee" component={Trainee} />
              <PrivateRoute path="/notFound" component={NoMatch} />
              <Route path="*">
                <Redirect to="/notFound" />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </SnackBarProvider>
    </>
  );
}

export default App;
