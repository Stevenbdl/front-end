import React from 'react';
import { Grid, Toolbar, Typography } from "@mui/material";
import { useGenericStyles } from "../../Generic/styles.generic";

export const CustomersTableToolbar = () => {
  const classes = useGenericStyles();

  return (
    <Toolbar>
      <Grid
        container
        direction="row"
      >
        <Grid container>
          <Grid item>
            <Typography
              className={classes.title}
              variant="h6"
              id="customers-title"
              component="div"
            >
              <strong>Customers</strong>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
};