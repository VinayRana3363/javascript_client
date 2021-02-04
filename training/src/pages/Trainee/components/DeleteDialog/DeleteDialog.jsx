/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { SnackBarContext } from '../../../../contexts';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
    };
  }

  handleDeleteClose = async (event, value) => {
    event.preventDefault();
    const {
      data, onClose, deleteTrainee,
    } = this.props;
    const { originalId } = data;
    this.setState({ spinner: true });
    await deleteTrainee({
      variables: {
        id: originalId,
      },
    })
      .then(() => {
        setTimeout(() => {
          this.setState({ spinner: false });
          value('Successfully Deleted!', 'success');
          onClose();
        }, 500);
      })
      .catch(() => {
        this.setState({ spinner: false });
        onClose();
        value("Can't Delete!", 'error');
      });
  };

  render() {
    const { openDialog, onClose } = this.props;
    const { spinner } = this.state;
    return (
      <SnackBarContext.Consumer>
        {(value) => (
          <Dialog
            open={openDialog}
            keepMounted
            onClose={onClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">Delete Trainee</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you really want to delete the trainee
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={(event) => this.handleDeleteClose(event, value)} color="primary">
                {!spinner && ('Delete')}
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

DeleteDialog.defaultProps = {
  openDialog: false,
  data: {},
  onClose: {},
};

DeleteDialog.propTypes = {
  openDialog: PropTypes.bool,
  data: PropTypes.objectOf(PropTypes.any),
  onClose: PropTypes.func,
};

export default DeleteDialog;
