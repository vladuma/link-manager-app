import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  }
}));

export default function SimpleSnackbar(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
    }}
    open={open}
    autoHideDuration={6000}
    >
    <SnackbarContent
        className={classes.error}
        aria-describedby="client-snackbar"
        message={
        <span id="client-snackbar" className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {props.message}
        </span>
        }
        action={[
        <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon className={classes.icon} />
        </IconButton>
        ]}
    />
    </Snackbar>
  );
}