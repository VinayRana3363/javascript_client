import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { SnackBarContext } from '../../../../contexts';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleDeleteClose = (event, value) => {
    event.preventDefault();
    const { data, onClose } = this.props;
    const originalDate = new Date(data.createdAt);
    const dateCheck = new Date('2019-02-14');
    if (originalDate > dateCheck) {
      // eslint-disable-next-line no-console
      console.log('Deleted Item', data);
      value('Successfully Deleted!', 'success');
    } else {
      value("Can't Delete!", 'error');
    }
    onClose();
  };

  render() {
    const { openDialog, onClose } = this.props;
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
                Delete
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
  data: PropTypes.objectOf(PropTypes.string),
  onClose: PropTypes.func,
};

export default DeleteDialog;
