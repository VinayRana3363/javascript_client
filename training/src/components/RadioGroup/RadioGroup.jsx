import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createSelectItems = () => {
    const items = [];
    const { options } = this.props;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < options.length; i++) {
      items.push(
        <>
          <input type="radio" name="options" key={Math.random} value={options[i].value} />
          {options[i].value}
          <br />
        </>,
      );
    }
    return items;
  }

  render() {
    const {
      value, onChange, error,
    } = this.props;
    console.log('inside RadioGroup', value, error);
    return (
      <>
        <Input onChange={onChange}>
          {this.createSelectItems()}
        </Input>
      </>
    );
  }
}

RadioGroup.defaultProps = {
  error: '',
  options: [],
};

RadioGroup.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
