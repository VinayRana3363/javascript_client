import React, { Component } from 'react';
import {
  Border, Input, InputBrown, InputRed, Error,
} from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h6 hidden>learn react</h6>
        <Border>
          <div><p><b>This is a Disabled Input</b></p></div>
          <div><Input defaultValue="Disabled Input" disabled /></div>
          <div><p><b>A Valid Input</b></p></div>
          <div><InputBrown defaultValue="Accessible" type="text" /></div>
          <div><p><b>An Input with errors</b></p></div>
          <div><InputRed defaultValue="101" type="text" /></div>
          <div><Error>Could not be greater than </Error></div>
        </Border>
      </div>
    );
  }
}

export default TextField;
