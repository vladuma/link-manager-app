import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: 25,
    right: 25,
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const SaveBtn = (props) => {
  let history = useHistory();
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={props.handleSave}>
        <SaveIcon />
      </Fab>
    </div>
  );
}

export default SaveBtn;