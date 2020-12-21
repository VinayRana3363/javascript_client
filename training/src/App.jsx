import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import themeStyle from './theme';
import {
  Login, TextFieldDemo, Trainee, InputDemo, ChildrenDemo, NoMatch,
} from './pages';
import { AuthRoute, PrivateRoute } from './routes';
import { NavBar } from './layouts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ThemeProvider theme={themeStyle}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/trainee" />
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
      </ThemeProvider>
    );
  }
}

export default App;
