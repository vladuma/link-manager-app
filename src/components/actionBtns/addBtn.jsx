import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

const AddBtn = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const doAction = () => {
    switch(props.action) {
      case 'addProject':
        return history.push('create');
      case 'addItem':
        return props.handleAdd()
    }
  }
  
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={doAction}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddBtn;