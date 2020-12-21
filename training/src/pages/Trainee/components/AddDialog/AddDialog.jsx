/* eslint-disable max-len */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import PropTypes from 'prop-types';

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  password: {
    margin: theme.spacing(1),
    display: 'flex',
  },
  error: {
    'max-width': 'fit-content',
  },
});

class AddDialog extends Component {
  schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().min(8),
  });

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {
        touchedName: false,
        touchedEmail: false,
        touchedPassword: false,
        touchedConfirmPassword: false,
      },
    };
    this.baseState = this.state;
  }

  handleButtonDisbale = () => {
    const { state } = this;
    try {
      this.schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { name, email, password } = this.state;
    this.setState(this.baseState);
    console.log({ name, email, password });
  };

  handleNameChange = async (field, touchField) => {
    const { touched } = this.state;
    // eslint-disable-next-line no-restricted-globals
    await this.setState({ [field]: event.target.value, touched: { ...touched, [touchField]: false } });
    if (field === 'email') {
      this.validateEmail();
    }
    if (field === 'password') {
      this.validatePassword();
    }
    if (field === 'confirmPassword') {
      this.validateConfirmPassword();
    }
  }

  isTouched = (field, touchedField) => {
    const { touched } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state[field] === '') {
      this.setState({
        touched: {
          ...touched,
          [touchedField]: true,
        },
      });
    }
  }

  validateEmail = () => {
    const { email, touched } = this.state;
    if (!new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i).test(email)) {
      this.setState({
        touched: {
          ...touched,
          touchedEmail: true,
        },
      });
    }
  }

  validatePassword = () => {
    const { password, touched } = this.state;
    if (!new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/).test(password)) {
      this.setState({
        touched: {
          ...touched,
          touchedPassword: true,
        },
      });
    }
  }

  validateConfirmPassword = () => {
    const { confirmPassword, password, touched } = this.state;
    if (confirmPassword !== password) {
      this.setState({
        touched: {
          ...touched,
          touchedConfirmPassword: true,
        },
      });
    }
  }

  render() {
    const { classes } = this.props;
    const {
      open, name, email, password, confirmPassword,
    } = this.state;
    const {
      touchedName, touchedEmail, touchedPassword, touchedConfirmPassword,
    // eslint-disable-next-line react/destructuring-assignment
    } = this.state.touched;
    return (
      <form noValidate autoComplete="off">
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            <b>Add Trainee</b>
          </Button>
          <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"><b>Add Trainee</b></DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter Trainee Details
              </DialogContentText>
              <div>
                <TextField
                  id="outlined-helperText"
                  label="Name"
                  value={name}
                  placeholder="Enter Trainee Name"
                  variant="outlined"
                  margin="dense"
                  helperText={touchedName ? 'Name is Required' : ' '}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  onChange={() => this.handleNameChange('name', 'touchedName')}
                  onBlur={() => this.isTouched('name', 'touchedName')}
                  error={touchedName}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="outlined-helperText"
                  label="Email"
                  value={email}
                  placeholder="Enter Trainee Email"
                  variant="outlined"
                  margin="dense"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={() => this.handleNameChange('email', 'touchedEmail')}
                  onBlur={() => this.isTouched('email', 'touchedEmail')}
                  error={touchedEmail}
                  // eslint-disable-next-line no-nested-ternary
                  helperText={touchedEmail ? (email === '' ? 'Email is Required' : 'Enter the valid Email') : ' '}
                  fullWidth
                />
              </div>
              <div className={classes.password}>
                <TextField
                  id="outlined-helperText"
                  label="Password"
                  value={password}
                  variant="outlined"
                  type="password"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={() => this.handleNameChange('password', 'touchedPassword')}
                  onBlur={() => this.isTouched('password', 'touchedPassword')}
                  error={touchedPassword}
                  // eslint-disable-next-line no-nested-ternary
                  helperText={touchedPassword ? (password === '' ? 'Password is Required' : 'Password must contains 1 lowercase,1 uppercase,1 numeric,at least one special character and minimum 8 character') : ' '}
                />
                <TextField
                  id="outlined-helperText"
                  label="Confirm Password"
                  value={confirmPassword}
                  variant="outlined"
                  type="password"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={() => this.handleNameChange('confirmPassword', 'touchedConfirmPassword')}
                  onBlur={() => this.isTouched('confirmPassword', 'touchedConfirmPassword')}
                  error={touchedConfirmPassword}
                  // eslint-disable-next-line no-nested-ternary
                  helperText={touchedConfirmPassword ? (confirmPassword === '' ? 'Confirm Password is Required' : ((confirmPassword !== password) ? 'Confirm Password not match with Password' : ' ')) : ' '}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary" disabled={this.handleButtonDisbale()}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </form>
    );
  }
}

AddDialog.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AddDialog);
