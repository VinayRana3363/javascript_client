/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React, { Component } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  sportOptions, Sport,
} from '../../config/constants';
import {
  Error,
} from './style';

class InputDemo extends Component {
  schema = yup.object().shape({
    name: yup.string().required().min(3),
    sport: yup.string().required(),
    Cricket: yup.string().when('sport', { is: 'Cricket', then: yup.string().required() }),
    Football: yup.string().when('sport', { is: 'Football', then: yup.string().required() }),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      Cricket: '',
      Football: '',
      gameOptions: '',
      isTouchedName: false,
      isTouchedSport: false,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value, isTouchedName: false }, () => {
      console.log(this.state);
    });
  }

  handleSportChange = (e) => {
    if (e.target.value !== 'select') {
      this.setState({
        sport: e.target.value, Cricket: '', Football: '', gameOptions: Sport[e.target.value], isTouchedSport: false,
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

  handleNameError = () => {
    const { name } = this.state;
    if (name === '') {
      return this.setState({ isTouchedName: true });
    }
    this.setState({ isTouchedName: false });
  }

  handleSportError = () => {
    const { sport } = this.state;
    if (sport === '') {
      return this.setState({ isTouchedSport: true });
    }
    this.setState({ isTouchedSport: false });
  }

  handleButtonDisbale = () => {
    const { state } = this;
    try {
      this.schema.validateSync(state);
    } catch (err) {
      console.log(err);
      return true;
    }
    return false;
  }

  render() {
    const {
      name, sport, Cricket, Football, gameOptions, isTouchedName, isTouchedSport,
    } = this.state;
    return (
      <div>
        <h6 hidden>learn react</h6>
        <div><p><b>Name</b></p></div>
        <TextField
          value={name}
          disabled={false}
          onBlur={this.handleNameError}
          onChange={this.handleNameChange}
        />
        {
          (isTouchedName) ? (
            <Error>Name Field is Required </Error>
          )
            : console.log(this.state)
        }
        <div><p><b>Select the game you play</b></p></div>
        <SelectField
          value={sport}
          error="Error"
          options={sportOptions}
          onChange={this.handleSportChange}
          onBlur={this.handleSportError}
          defaultText="select"
        />
        {
          (isTouchedSport) ? (
            <Error>Sport Field is Required </Error>
          )
            : console.log(this.state)
        }
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
                {
                  (Cricket === '' && Football === '') ? (
                    <div>
                      <br />
                      <br />
                      <Error>What you do is Required  Field</Error>
                    </div>
                  )
                    : console.log('After name', name)
                }
              </>
            )
            : <></>
        }
        <Button
          value="Submit"
          onClick={() => { console.log('Button clicked'); }}
          disabled={this.handleButtonDisbale()}
        />
        <Button
          value="Cancel"
          onClick={() => { console.log('Button clicked cancel'); }}
          disabled={false}
        />
      </div>
    );
  }
}

export default InputDemo;
