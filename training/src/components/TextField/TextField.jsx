import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Input,
} from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      value, disabled, onChange, error,
    } = this.props;
    return (
      <div>
        <h6 hidden>learn react</h6>
        <Input defaultValue={error || value} disabled={disabled} onChange={onChange} />
      </div>
    );
  }
}

TextField.defaultProps = {
  disabled: true,
  error: '',
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
