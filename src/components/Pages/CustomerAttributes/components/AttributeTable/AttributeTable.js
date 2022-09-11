import { IconButton, Menu, MenuItem, MenuList, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ModalCreateAttribute } from "../ModalCreateAttribute";
import { AttributeHeadToolbar } from "./AttributeHeadToolbar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeleteDialog } from "../../../../Generic/ModalConfirmationDialog/context";
import { ModalEditAttribute } from "../ModalEditAttribute";
import { ModalConfirmationDialog } from "../../../../Generic/ModalConfirmationDialog/ModalConfirmationDialog";

const dummyData = [
  { id: 1, name: 'id', value: '1', can_be_modified: false },
  { id: 2, name: 'email', value: 'steve@test.com', can_be_modified: false },
  { id: 5, name: 'created_at', value: '2121321', can_be_modified: false },
  { id: 3, name: 'first_name', value: 'Steve', can_be_modified: true },
  { id: 4, name: 'job_title', value: 'Programmer', can_be_modified: true },

];

export const AttributeTable = ({ attributes, setAttributes }) => {
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
    setCurrentId(attr.id);
  }

  const handleEditAttribute = (attr) => {
    setOpenModalEditAttribute(true);
    setAttributeToEdit({ ...attr });
  }

  useEffect(() => {
    setAttributes({
      data_loaded: dummyData,
      attributes: dummyData,
    });
  }, []);

  const handleOkDeleteAttribute = () => {
    const newAttributes = attributes.attributes.filter((attr2) => attr2.id !== currentId);
    
    setAttributes({
      ...attributes,
      attributes: newAttributes
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
              attributes.attributes.map((attr, index) => (
                <TableRow key={attr.id}>
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
        attributes={attributes}
        setAttributes={setAttributes}
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
        attributes={attributes}
        setAttributes={setAttributes}
        setOpenContextMenuIndex={setOpenContextMenuIndex}
      />
    </Paper>
  );
}