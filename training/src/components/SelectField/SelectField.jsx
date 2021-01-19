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
      onChange, onBlur,
    } = this.props;
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
  options: [],
};

SelectField.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default SelectField;
