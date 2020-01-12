import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginLeft: '17px!important',
  },
  text: {
    position: 'absolute',
  },
}));

const LinkPopup = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [copySuccess, setCopySuccess] = React.useState('');
  const textAreaRef = React.useRef(null);

  const handleClose = () => {
    setOpen(false);
  };
  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied to clipboard');
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <form className={classes.root}>
              <TextField id="standard-basic" inputRef={textAreaRef}
                value={'https://us-central1-bookmark-app-ff6b2.cloudfunctions.net/' + props.link}/>
              {
                document.queryCommandSupported('copy') &&
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={copyToClipboard}
                    className={classes.button}
                  >
                    <FileCopyIcon />
                  </IconButton>
              }
            </form>
          <DialogContentText id="alert-dialog-description" className={classes.text}>
              {copySuccess}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default LinkPopup;