/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable quotes */
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";

import { Email, Person } from "@material-ui/icons";
import CircularProgress from '@material-ui/core/CircularProgress';
import { SnackBarContext } from '../../../../contexts';

class EditDialog extends Component {
  schema = yup.object().shape({
    name: yup.string().required().min(3).label("Name"),
    email: yup.string().email().required().label("Email"),
  });

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.details.name,
      email: this.props.details.email,
      spinner: false,
      touched: {
        name: false,
        email: false,
      },
    };
  }

  handleNameValue = (event) => {
    const { details } = this.props;
    const { email, touched } = this.state;
    if (email === "") {
      this.setState({
        email: details.email,
      });
    }
    this.setState({
      name: event.target.value,
      touched: {
        ...touched,
        name: true,
      },
    });
  };

  handleEmailValue = (event) => {
    const { details } = this.props;
    const { name, touched } = this.state;
    if (name === "") {
      this.setState({
        name: details.name,
      });
    }
    this.setState({
      email: event.target.value,
      touched: {
        ...touched,
        email: true,
      },
    });
  };

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
    return "";
  };

  hasErrors = () => {
    const { state } = this;
    try {
      this.schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  handleButtonError = () => {
    if (this.hasErrors()) {
      return false;
    }
    return true;
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  };

  isValid = (item) => {
    const { state } = this;
    const { touched } = state;

    if (touched[[item]] === false) {
      return false;
    }
    return this.hasErrors();
  };

  onConsole = () => {
    this.setState({
      buttonEnable: false,
      name: "",
      email: "",
      touched: {
        name: false,
        email: false,
      },
    });
  };

  onSubmit = async (event, value) => {
    const {
      onClose, details, updateTrainee, refetchQueries,
    } = this.props;
    const { name, email } = this.state;
    this.setState({ spinner: true });
    await updateTrainee({
      variables: {
        originalId: details.originalId,
        name,
        email,
      },
    })
      .then(() => {
        setTimeout(() => {
          this.setState({ spinner: false });
          this.onConsole();
          value('Successfully Edited!', 'success');
          onClose();
          refetchQueries();
        }, 500);
      })
      .catch(() => {
        value('Unable to edit', 'error');
        this.onConsole();
        onClose();
      });
  };

  render() {
    const { editOpen, onClose, details } = this.props;
    const { spinner } = this.state;
    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <Dialog open={editOpen} onClose={this.handleClose}>
            <DialogTitle>Edit Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter your trainee details</DialogContentText>
              <TextField
                label="Name"
                defaultValue={details.name}
                margin="normal"
                variant="outlined"
                onChange={this.handleNameValue}
                onBlur={() => this.isTouched("name")}
                helperText={this.getError("name")}
                error={this.isValid("name")}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email Address"
                defaultValue={details.email}
                margin="normal"
                variant="outlined"
                onChange={this.handleEmailValue}
                onBlur={() => this.isTouched("email")}
                helperText={this.getError("email")}
                error={this.isValid("email")}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={(event) => this.onSubmit(event, value)}
                disabled={!this.handleButtonError()}
              >
                {!spinner && ('Submit')}
                {
                  spinner && (
                    <div>
                      <CircularProgress color="secondary" />
                    </div>
                  )
                }
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </SnackBarContext.Consumer>
    );
  }
}

EditDialog.propTypes = {
  details: PropTypes.objectOf(PropTypes.any).isRequired,
  onClose: PropTypes.func,
  editOpen: PropTypes.bool,
};

EditDialog.defaultProps = {
  onClose: () => {},
  editOpen: false,
};

export default EditDialog;
