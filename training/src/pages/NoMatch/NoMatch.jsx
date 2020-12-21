import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  paper: {
    'text-align-last': 'center',
  },
});

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.paper}>
          <h1>Not Found</h1>
          <h3>Seems like the page you are looking for does not exist</h3>
        </div>
      </>
    );
  }
}

NoMatch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(NoMatch);
