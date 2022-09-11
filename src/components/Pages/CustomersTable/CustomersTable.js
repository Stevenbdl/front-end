import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { CustomersTableToolbar } from './CustomersTableToolbar';

const columns = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'Action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    view_attribute: (id) => {
      return <IconButton component={Link} to='/customer/attributes'>
        <VisibilityIcon />
      </IconButton>
    }
  },
  {
    id: 'last_updated',
    label: 'Last Updated',
    minWidth: 170,
    align: 'right',
  },
];

const rows = [
  { id: 1, email: 'steve@test.com', last_updated: 'May 15th 2022, 10:20pm' },
  { id: 2, email: 'ronald@test.com', last_updated: 'May 15th 2022, 10:20pm' },
  { id: 3, email: 'dummy1@test.com', last_updated: 'May 15th 2022, 10:20pm' },
  { id: 4, email: 'dummy2@test.com', last_updated: 'May 15th 2022, 10:20pm' },
  { id: 5, email: 'dummy3@test.com', last_updated: 'May 15th 2022, 10:20pm' },
  { id: 6, email: 'dummy4@test.com', last_updated: 'May 15th 2022, 10:20pm' },
  { id: 7, email: 'dummy5@test.com', last_updated: 'May 15th 2022, 10:20pm' },
].sort((a, b) => (a.id < b.id ? -1 : 1));

export const CustomersTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <CustomersTableToolbar />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.view_attribute
                            ? column.view_attribute(1)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}