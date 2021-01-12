import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Text } from '../../components';

class ChildrenDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Typography>
          <Text first={10} second={3} operator="+" />
        </Typography>
        <Typography>
          <Text first={8} second={4} operator="-" />
        </Typography>
        <Typography>
          <Text first={3} second={9} operator="*" />
        </Typography>
        <Typography>
          <Text first={99} second={3} operator="/" />
        </Typography>
        <Typography>
          <Text first={2} second={0} operator="/" />
        </Typography>
        <Typography>
          <Text first={13} second={22} operator="+">
            {(first, second, operator, result) => (
              <span>{`The Sum of ${first} and ${second} is ${result}`}</span>
            )}
          </Text>
        </Typography>
        <br />
        <Text first={20} second={4} operator="*">
          {(first, second, operator, result) => (
            <span>{`When we try to multiply ${first} with ${second} then the result will be ${result}`}</span>
          )}
        </Text>
        <br />
        <Text first={2} second={0} operator="/">
          {(first, second, operator, result) => (
            <span style={{ color: 'blue' }}>{`When we divide ${first} with ${second} then we get ${result} as a result.`}</span>
          )}
        </Text>
        <br />
        <Typography>
          <Text first={40} second={4} operator="/">
            {(first, second, operator, result) => (
              <span style={{ color: 'blue' }}>{`When we divide ${first} and ${second} we get ${result}`}</span>
            )}
          </Text>
        </Typography>
      </>
    );
  }
}
export default ChildrenDemo;
