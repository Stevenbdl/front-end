import { Box, Button, Grid, Modal, Slide, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useModalEditAttributeStyles } from "./ModalEditAttribute.style";

export const ModalEditAttribute = ({
  openModalEditAttribute,
  setOpenModalEditAttribute,
  attributeToEdit,
  setOpenContextMenuIndex,
  customer,
  setCustomer
}) => {
  const classes = useModalEditAttributeStyles();
  const [showErrors, setShowErrors] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(attributeToEdit.value);
  }, [attributeToEdit.value]);

  const handleClose = () => {
    setOpenModalEditAttribute(false);
    setShowErrors(false);
    setValue("");
  }

  const handleEdit = () => {
    if (value.length === 0) {
      setShowErrors(true);
      return;
    }
    const newAttributes = JSON.parse(JSON.stringify(customer.attributes.state));
    newAttributes[newAttributes.findIndex((attr) => attr.name === attributeToEdit.name)].value = value;

    handleClose();
    setCustomer({
      ...customer,
      attributes: {
        ...customer.attributes,
        state: newAttributes
      }
    });
    setOpenContextMenuIndex(-1);
  }

  return (
    <Modal
      open={openModalEditAttribute}
      onClose={handleClose}
      className={classes.modal}
    >
      <Slide direction="up" in={openModalEditAttribute} mountOnEnter unmountOnExit>
        <Box className={classes.box} sx={{ borderRadius: 4 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          // spacing={2}
          >
            <Grid item>
              <h2>Edit Attribute</h2>
            </Grid>

            <Grid container direction="row" spacing={2}>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  disabled
                  id="modal-edit-attribute-name"
                  label="Name"
                  variant="standard"
                  value={attributeToEdit.name}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="modal-edit-attribute-value"
                  label="Value"
                  variant="standard"
                  value={value}
                  onChange={(e) => { setValue(e.target.value); }}
                  error={showErrors && (value === "" || value.length <= 1)}
                  helperText={showErrors && ((value === "" && "Value Field is Required") || (value.length === 0 && "Value cannot be empty"))}
                />
              </Grid>
            </Grid>

            <Grid item style={{ padding: 5, marginTop: 5 }}>
              <Button variant="contained" onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Modal>
  )
};