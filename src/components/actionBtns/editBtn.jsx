import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

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

const EditBtn = (props) => {
  let history = useHistory();
  const classes = useStyles();

  const doAction = () => {
    switch(props.action) {
      case 'editProject':
        console.log(props);
        return history.push({
          pathname: `/edit/${props.id}`,
          state: {
            ...props.project
          }
        });
    }
  }
  
  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add" onClick={doAction}>
        <EditIcon />
      </Fab>
    </div>
  );
}

export default EditBtn;