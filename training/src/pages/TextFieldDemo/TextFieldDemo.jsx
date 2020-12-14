import React, { Component } from 'react';
import { TextField, Slider } from '../../components';

import {
  Border, InputRed, Error,
} from './style';

class TextFieldDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h6 hidden>learn react</h6>
        <Border>
          <Slider
            altText="Default Banner 1"
            banners={['./images/cloud.jpg', './images/full-stack-web-development.jpg', './images/js.jpg', './images/load-balancer.png']}
            defaultBanner="./images/default.png"
            duration={2000}
            height={200}
            random={false}
          />
          <div><p><b>This is a Disabled Input</b></p></div>
          <div>
            <TextField
              value="Disabled Input"
              disabled
              error="Error"
            />
          </div>
          <div><p><b>A Valid Input</b></p></div>
          <div>
            <TextField
              value="Accessible"
              disabled={false}
              error="Error"
            />
          </div>
          <div><p><b>An Input with errors</b></p></div>
          <div><InputRed defaultValue="101" type="text" /></div>
          <div><Error>Could not be greater than </Error></div>
        </Border>
      </div>
    );
  }
}

export default TextFieldDemo;
