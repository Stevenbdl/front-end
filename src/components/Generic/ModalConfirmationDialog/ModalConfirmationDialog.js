import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const ModalConfirmationDialog = ({ title, open, setOpen, handleOk, content }) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <Dialog
      maxWidth="md"
      aria-labelledby="confirmation-dialog-title"
      open={open}
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="primary"
          size="large"
        >
          Cancel
        </Button>
        <Button
          onClick={handleOk}
          variant="contained"
          color="primary"
          size="large"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}