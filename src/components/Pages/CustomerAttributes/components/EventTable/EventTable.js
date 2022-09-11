import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { EventHeadToolbar } from "./EventHeadToolbar";

const events = [
  { id: 1, event_name: 'generate', count: 1 },
  { id: 2, event_name: 'purchase', count: 4 },
  { id: 3, event_name: 'create', count: 2 },

];

export const EventTable = () => {
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
              events.map((event) => (
                <TableRow key={event.id}>
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