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
      disabled, value, onClick,
    } = this.props;
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
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: true,
};

export default Button;
