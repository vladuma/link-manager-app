import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AddBtns = (props) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
        {props.isEditMode ?
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={props.handleAdd}
            >
                Add
            </Button>
            :
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<EditIcon />}
                onClick={props.handleEdit}
            >
                Edit
            </Button>
        }
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={props.handleDelete}
        >
            {props.isEditMode ? 'Cancel' : 'Remove'}
        </Button>
    </div>
  );
}

export default AddBtns;