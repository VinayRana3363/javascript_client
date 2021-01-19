import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeToken = () => localStorage.removeItem('token');

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Trainee Portal
            </Typography>
            <Button component={Link} to="/trainee" color="inherit">TRAINEE</Button>
            <Button component={Link} to="/text-field-demo" color="inherit">TEXTFIELD DEMO</Button>
            <Button component={Link} to="/input-demo" color="inherit">INPUT DEMO</Button>
            <Button component={Link} to="/children-demo" color="inherit">CHILDERN DEMO</Button>
            <Button component={Link} to="/login" color="inherit" onClick={this.removeToken}>LOGOUT</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NavBar);
