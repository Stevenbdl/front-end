import createStyles from "@mui/styles/createStyles";
import { makeStyles } from "@mui/styles";

export const useGenericStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      width: '100%',
      height: '100%',
      border: '1px solid'
    },
    title: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }),
);