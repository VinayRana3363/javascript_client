import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components';

class PrivateLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <NavBar>
        {children}
      </NavBar>
    );
  }
}

PrivateLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default PrivateLayout;
