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
    console.log('props value', this.props);
    // eslint-disable-next-line react/prop-types
    const { value, disabled } = this.props;
    return (
      <div>
        <h6 hidden>learn react</h6>
        <Input defaultValue={value} disabled={disabled} />
      </div>
    );
  }
}

TextField.defaultProps = {
  value: 'Default Value',
  disabled: true,
};

TextField.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextField;
