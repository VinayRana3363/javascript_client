import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      first, second, operator, result,
    } = this.props;
    return (
      <>
        <div>
          <p>
            {first}
            {' '}
            {operator}
            {' '}
            {second}
            {' = '}
            {result}
          </p>
        </div>
        <div>
          <p>
            {'When we did this'}
            {first}
            {' '}
            {operator}
            {' '}
            {second}
            {' operation the we get '}
            {result}
          </p>
        </div>
      </>
    );
  }
}

ChildrenDemo.defaultProps = {
  first: 3,
  second: 4,
  operator: '+',
  result: 7,
};

ChildrenDemo.propTypes = {
  first: PropTypes.number,
  second: PropTypes.number,
  operator: PropTypes.string,
  result: PropTypes.number,
};

export default ChildrenDemo;
