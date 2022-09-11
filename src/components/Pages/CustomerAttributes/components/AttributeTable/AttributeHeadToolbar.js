import { Grid, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { useGenericStyles } from "../../../../Generic/styles.generic";
import AddIcon from '@mui/icons-material/Add';

export const AttributeHeadToolbar = ({ setOpenModalCreateAttribute }) => {
  const classes = useGenericStyles();

  return (
    <Toolbar>
      <Grid
        container
        direction="row"
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={10}>
            <Typography
              className={classes.title}
              variant="h6"
              id="attributes-title"
              component="div"
            >
              <strong>Attributes</strong>
            </Typography>
          </Grid>

          <Grid item>
            <Grid container spacing={1}>
              {/* <Grid item>
                <Tooltip
                  title="Edit attributes"
                  style={{ flex: 1 }}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Grid> */}
              <Grid item>
                <Tooltip
                  title="Create attribute"
                  style={{ flex: 1 }}
                >
                  <IconButton onClick={() => { setOpenModalCreateAttribute(true); }}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  );
}