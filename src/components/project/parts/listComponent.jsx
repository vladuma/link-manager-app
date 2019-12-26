import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditBtns from './editBtns';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: '10px 0'
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}));

export default function List(props) {
  const classes = useStyles();

  const handleDelete = () => {
    console.log('delete btn');
    props.handleDelete(props.id);
  }
  const handleEdit = () => {
    console.log('edit btn')
    props.handleEdit(props.id);
  }
  console.log(props.data.type)
  if (props.data.type === 'link' || props.data.type === 'Link') {
    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          <a href={props.data.content} target="_blank">{props.data.description ? props.data.description : props.data.content}</a>
        </Typography>
        {!props.isView ?
            <EditBtns isEditMode={false} handleEdit={handleEdit} handleDelete={handleDelete} />
          :
            null
        }
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3" className={classes.title}>
          { props.data.content }
        </Typography>
        <Typography component="p">
          { props.data.description }
        </Typography>
        {!props.isView ?
            <EditBtns isEditMode={false} handleEdit={handleEdit} handleDelete={handleDelete} />
          :
            null
        }
      </Paper>
    );
  }
}