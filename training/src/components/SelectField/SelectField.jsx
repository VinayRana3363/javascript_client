import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Select,
} from './style';

class SelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createSelectItems = () => {
    const items = [];
    const { options } = this.props;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < options.length; i++) {
      items.push(<option key={i} value={options[i].value}>{options[i].label}</option>);
    }
    return items;
  }

  render() {
    const {
      value, onChange, error, defaultText, onBlur,
    } = this.props;
    console.log('inside SelectField', value, error, defaultText);
    return (
      <>
        <Select onChange={onChange} onBlur={onBlur}>
          {this.createSelectItems()}
        </Select>
      </>
    );
  }
}

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: 'select',
};

SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  defaultText: PropTypes.string,
};

export default SelectField;
