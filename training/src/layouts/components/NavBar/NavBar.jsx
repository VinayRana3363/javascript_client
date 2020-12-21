import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
// import { Trainee } from '../../../pages';

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

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Trainee Portal
            </Typography>
            <Button href="/trainee" color="inherit">TRAINEE</Button>
            <Button href="/text-field-demo" color="inherit">TEXTFIELD DEMO</Button>
            <Button href="/input-demo" color="inherit">INPUT DEMO</Button>
            <Button href="/children-demo" color="inherit">CHILDERN DEMO</Button>
            <Button color="inherit">LOGOUT</Button>
          </Toolbar>
        </AppBar>
        <div className="private">{children}</div>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default withStyles(styles)(NavBar);
