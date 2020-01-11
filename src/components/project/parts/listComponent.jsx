import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import EditBtns from './editBtns';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(3, 3, 3, 2),
    margin: '10px 0',
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  isSelected: {
    boxShadow: '0 0 0 2px ' + theme.palette.primary.light,
  },
  notSelected: {
    boxShadow: 'none',
  },
  radio: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
}));

export default function List(props) {
  const classes = useStyles();
  const [isSelected, setSelected] = React.useState(false);

  const handleDelete = () => {
    console.log('delete btn');
    props.handleDelete(props.id);
  }
  const handleEdit = () => {
    console.log('edit btn')
    props.handleEdit(props.id);
  }
  React.useEffect(() => {
    if (!props.data.isView && props.handleItemSelect) {
      setSelected(isSelected);
      props.handleItemSelect(props.data.id, isSelected);
    }
  }, [isSelected]);
  React.useEffect(() => {
    setSelected(false);
  }, [props.data]);

  if (props.data.type === 'link' || props.data.type === 'Link') {
    return (
      <Paper className={clsx(classes.root, {
                [classes.isSelected]: isSelected,
                [classes.notSelected]: !isSelected
            })}
        onClick={() => props.isView ? setSelected(!isSelected) : null}>
        
        {props.isView ?
          <Radio
            className={classes.radio}
            color="default"
            size="small"
            checked={isSelected}
            onChange={() => setSelected(!isSelected)}
          />
          :
          null
        }

        <Typography variant="h5" component="h3" className={classes.title}>
          <a href={props.data.content} target="_blank" onClick={(e)=> e.stopPropagation()}>
            {props.data.description ? props.data.description : props.data.content}
          </a>
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