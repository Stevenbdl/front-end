import { Grid, Toolbar, Typography } from "@mui/material"
import { useGenericStyles } from "../../../../Generic/styles.generic";

export const EventHeadToolbar = () => {
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
              id="attributes-title"
              component="div"
            >
              <strong>Events</strong>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}