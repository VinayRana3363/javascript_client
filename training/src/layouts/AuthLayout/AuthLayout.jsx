import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { children } = this.props;
    return (
      <div className="main">{children}</div>
    );
  }
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

export default AuthLayout;
