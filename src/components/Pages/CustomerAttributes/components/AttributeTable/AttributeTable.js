import { IconButton, Menu, MenuItem, MenuList, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { ModalCreateAttribute } from "../ModalCreateAttribute";
import { AttributeHeadToolbar } from "./AttributeHeadToolbar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeleteDialog } from "../../../../Generic/ModalConfirmationDialog/context";
import { ModalEditAttribute } from "../ModalEditAttribute";
import { ModalConfirmationDialog } from "../../../../Generic/ModalConfirmationDialog/ModalConfirmationDialog";

export const AttributeTable = ({ customer, setCustomer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openContextMenuIndex, setOpenContextMenuIndex] = useState(-1);
  const [openModalConfirmationDialog, setOpenModalConfirmationDialog] = useState(false);
  const [openModalEditAttribute, setOpenModalEditAttribute] = useState(false);
  const [openModalCreateAttribute, setOpenModalCreateAttribute] = useState(false);
  const [attributeToEdit, setAttributeToEdit] = useState({
    id: -1,
    name: '',
    value: ''
  });
  const {
    currentValue: currentId,
    setCurrentValue: setCurrentId,
  } = useDeleteDialog({ value: -1 });

  const actionsContextOpen = (event, index) => {
    setAnchorEl(event?.currentTarget);
    setOpenContextMenuIndex(index);
  }

  const isActionsContextOpen = (index) => index === openContextMenuIndex;

  const handleDeleteAttribute = (attr) => {
    setOpenModalConfirmationDialog(true);
    setCurrentId(attr.name);
  }

  const handleEditAttribute = (attr) => {
    setOpenModalEditAttribute(true);
    setAttributeToEdit({ ...attr });
  }

  const handleOkDeleteAttribute = () => {
    const newAttributes = customer.attributes.state.filter((attr2) => attr2.name !== currentId);
    
    setCustomer({
      ...customer,
      attributes: {
        ...customer.attributes,
        state: newAttributes
      }
    });

    setCurrentId(-1);
    setOpenModalConfirmationDialog(false);
    setOpenContextMenuIndex(-1);
  }

  return (
    <Paper>
      <AttributeHeadToolbar
        setOpenModalCreateAttribute={setOpenModalCreateAttribute}
      />
      <TableContainer
        style={{
          maxHeight: 322
        }}
      >
        <Table
          style={{
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Value</strong></TableCell>
              <TableCell align="right"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              customer.attributes.state.map((attr, index) => (
                <TableRow key={attr.name}>
                  <TableCell>
                    {attr.name}
                  </TableCell>
                  <TableCell>
                    {attr.value}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="actions attribute table"
                      aria-controls="actions-attribute-table"
                      aria-haspopup="true"
                      color="inherit"
                      size="small"
                      onClick={(event) => { actionsContextOpen(event, index) }}
                      disabled={!attr.can_be_modified}
                    >
                      <MoreVertIcon />
                    </IconButton>

                    <Menu
                      id="actions-attribute-table"
                      anchorEl={anchorEl}
                      open={isActionsContextOpen(index)}
                      onClose={() => { actionsContextOpen(null, -1) }}
                    >
                      <MenuList>
                        <MenuItem dense onClick={() => handleEditAttribute(attr)}>
                          <Typography variant="inherit">Edit</Typography>
                        </MenuItem>
                        <MenuItem dense onClick={() => handleDeleteAttribute(attr)}>
                          <Typography variant="inherit">Delete</Typography>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ModalCreateAttribute
        openModalCreateAttribute={openModalCreateAttribute}
        setOpenModalCreateAttribute={setOpenModalCreateAttribute}
        customer={customer}
        setCustomer={setCustomer}
      />
      <ModalConfirmationDialog
        title="Are you sure that you want delete this attribute?"
        open={openModalConfirmationDialog}
        setOpen={setOpenModalConfirmationDialog}
        content="This proccess cannot be undone"
        handleOk={() => { handleOkDeleteAttribute(); }}
      />
      <ModalEditAttribute
        openModalEditAttribute={openModalEditAttribute}
        setOpenModalEditAttribute={setOpenModalEditAttribute}
        attributeToEdit={attributeToEdit}
        customer={customer}
        setCustomer={setCustomer}
        setOpenContextMenuIndex={setOpenContextMenuIndex}
      />
    </Paper>
  );
}