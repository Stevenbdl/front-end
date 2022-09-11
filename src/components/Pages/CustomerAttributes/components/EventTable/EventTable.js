import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { EventHeadToolbar } from "./EventHeadToolbar";

export const EventTable = ({ customer }) => {
  return (
    <Paper>
      <EventHeadToolbar />
      <TableContainer
        style={{
          maxHeight: 216
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
              <TableCell><strong>Event Name</strong></TableCell>
              <TableCell><strong>Count</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {
              customer.events.map((event) => (
                <TableRow key={event.event_name}>
                  <TableCell>
                    {event.event_name}
                  </TableCell>
                  <TableCell>
                    {event.count}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}