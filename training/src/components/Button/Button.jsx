import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { ButtonField } from './style';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      color, disabled, style, value, onClick,
    } = this.props;
    console.log('Inaside Button Component', color, style, disabled, value);
    return (
      <>
        <ButtonField submit={(value === 'Submit')} onClick={onClick} value={value} disabled={disabled}>
          {value}
        </ButtonField>
      </>
    );
  }
}

Button.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  color: 'default',
  disabled: true,
  style: {},
};

export default Button;
