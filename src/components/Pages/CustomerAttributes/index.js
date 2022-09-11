import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { AttributeTable } from "./components/AttributeTable/AttributeTable";
import { EventTable } from "./components/EventTable/EventTable";
import { isEqual } from 'lodash';

export const CustomerAttributes = () => {
  const [attributes, setAttributes] = useState({
    data_loaded: [],
    attributes: []
  });

  return (
    <Paper>
      <Box sx={{
        padding: 2
      }}>
        <Grid
          container
          direction="column"
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <h1>steve@test.com</h1>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="inherit">
              Last updated: Mar 20th 2019, 3:16 pm
            </Typography>
          </Grid>

          <Grid
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <AttributeTable
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </Grid>

            <Grid item>
              <EventTable />
            </Grid>

            <Grid container justifyContent="flex-end" sx={{ paddingTop: 1 }}>
              <Grid item>
                <Button
                  disabled={isEqual(attributes.attributes, attributes.data_loaded)}
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}