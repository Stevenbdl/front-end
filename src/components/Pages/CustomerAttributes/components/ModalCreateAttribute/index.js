import { Box, Button, Grid, Modal, Slide, TextField } from "@mui/material";
import { useState } from "react";
import { useModalCreateAttributeStyles } from "./ModalCreateAttribute.style";

export const ModalCreateAttribute = ({
  openModalCreateAttribute,
  setOpenModalCreateAttribute,
  attributes,
  setAttributes
}) => {
  const classes = useModalCreateAttributeStyles();
  const [attribute, setAttribute] = useState({
    id: -1,
    name: '',
    value: '',
    can_be_modified: true
  });
  const [showErrors, setShowErrors] = useState(false);

  const handleClose = () => {
    setOpenModalCreateAttribute(false);
    setShowErrors(false);
    setAttribute({
      name: '',
      value: '',
      can_be_modified: true
    });
  }

  const handleCreate = () => {
    const { name, value } = attribute;
    if ((!name || name.length < 3 || attributes.attributes.some((att) => att.name === name)) || (!value || value.length === 0)) {
      setShowErrors(true);
      return;
    }

    let maxId = 1;
    attributes.attributes.forEach(attr => {
      maxId = Math.max(attr.id, maxId);
    });
    setAttributes({
      ...attributes,
      attributes: [...attributes.attributes, {
        ...attribute, id: maxId + 1
      }]
    });
    handleClose();
  }

  return (
    <Modal
      open={openModalCreateAttribute}
      onClose={handleClose}
      className={classes.modal}
    >
      <Slide direction="up" in={openModalCreateAttribute} mountOnEnter unmountOnExit>
        <Box className={classes.box} sx={{ borderRadius: 4 }}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          // spacing={2}
          >
            <Grid item>
              <h2>Create Attribute</h2>
            </Grid>

            <Grid container direction="row" spacing={2}>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="modal-create-attribute-name"
                  label="Name"
                  variant="standard"
                  value={attribute.name}
                  onChange={(e) => { setAttribute({ ...attribute, name: e.target.value }); }}
                  error={showErrors && (attribute.name === "" || attribute.name.length < 3 || attributes.some((att) => att.name === attribute.name))}
                  helperText={showErrors && (
                    (attribute.name === "" && "Name Field is Required")
                    ||
                    (attribute.name.length < 3 && "Name length should be more than 3 chars")
                    ||
                    (attributes.some((att) => att.name === attribute.name) && "There are a attribute with this name, please choose another")
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  fullWidth
                  id="modal-create-attribute-value"
                  label="Value"
                  variant="standard"
                  onChange={(e) => { setAttribute({ ...attribute, value: e.target.value }); }}
                  error={showErrors && (attribute.value === "" || attribute.value.length <= 1)}
                  helperText={showErrors && ((attribute.value === "" && "Value Field is Required") || (attribute.value.length === 0 && "Value cannot be empty"))}
                />
              </Grid>
            </Grid>

            <Grid item style={{ padding: 5, marginTop: 5 }}>
              <Button variant="contained" onClick={handleCreate}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Modal>
  )
};