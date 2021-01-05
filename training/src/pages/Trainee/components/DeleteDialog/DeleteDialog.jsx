import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

class DeleteDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClose = () => {
    const { data, onClose } = this.props;
    console.log('Deleted trainee', data);
    onClose();
  };

  render() {
    const { openDialog, onClose } = this.props;
    return (
      <div>
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
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
