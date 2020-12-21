import React, { Component } from 'react';
import { AddDialog } from './components';

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <AddDialog />
    );
  }
}

export default Trainee;
