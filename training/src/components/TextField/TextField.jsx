/* eslint-disable max-len */
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
      value, disabled, onChange, error, onBlur,
    } = this.props;
    return (
      <div>
        <h6 hidden>learn react</h6>
        <Input defaultValue={value || error} disabled={disabled} onChange={onChange} onBlur={onBlur} />
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
  onBlur: PropTypes.func.isRequired,
};

export default TextField;
