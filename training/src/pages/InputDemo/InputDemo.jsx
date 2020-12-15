import React, { Component } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  sportOptions, Sport,
} from '../../config/constants';

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      Cricket: '',
      Football: '',
      gameOptions: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value }, () => {
      console.log(this.state);
    });
  }

  handleSportChange = (e) => {
    if (e.target.value !== 'select') {
      this.setState({
        sport: e.target.value, Cricket: '', Football: '', gameOptions: Sport[e.target.value],
      }, () => {
        console.log(this.state);
      });
    } else {
      this.setState({ sport: '' }, () => {
        console.log(this.state);
      });
    }
  }

  handleGameOptionsChange =(e) => {
    const { sport } = this.state;
    Object.keys(Sport).forEach(
      (key) => {
        if (key === sport) {
          this.setState({ [key]: e.target.value }, () => {
            console.log(this.state);
          });
        } else {
          this.setState({ [key]: '' }, () => {
            console.log(this.state);
          });
        }
      },
    );
  }

  render() {
    const {
      name, sport, Cricket, Football, gameOptions,
    } = this.state;
    return (
      <div>
        <h6 hidden>learn react</h6>
        <div><p><b>Name</b></p></div>
        <TextField
          value={name}
          disabled={false}
          onChange={this.handleNameChange}
        />
        <div><p><b>Select the game you play</b></p></div>
        <SelectField
          value={sport}
          error="Error"
          options={sportOptions}
          onChange={this.handleSportChange}
          defaultText="select"
        />
        {
          (sport !== '')
            ? (
              <>
                <div><p><b>What you do</b></p></div>
                <RadioGroup
                  value={Cricket || Football}
                  error="Error"
                  options={gameOptions}
                  onChange={this.handleGameOptionsChange}
                  defaultText="select"
                />
              </>
            )
            : <></>
        }
      </div>
    );
  }
}

export default InputDemo;
