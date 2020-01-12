import React from 'react';
import clsx from "clsx";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
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
  counter: {
    position: 'absolute',
    top: 0,
    right: 0,
    // width: 20,
    // height: 20,
  },
}));

export default function List(props) {
  const classes = useStyles();
  const [isSelected, setSelected] = React.useState(false);
  const [selectedCount, setSelectedCount] = React.useState(props.data.selectedCount ? props.data.selectedCount : props.selectedCount);
  const [maxCount, setMaxCount] = React.useState(props.selectedCount);

  const handleDelete = () => {
    props.handleDelete(props.id);
  }
  const handleEdit = () => {
    props.handleEdit(props.id);
  }
  const handleCounter = () => {    
    if (isSelected) {
      setSelectedCount(maxCount + 1);
    } else {
      if (maxCount <= 0) {
        setSelectedCount(0);
      } else {
        setSelectedCount(maxCount - 1);
      }
    }
  }

  React.useEffect(() => {
    if (!props.data.isView && props.handleItemSelect) {
      setSelected(isSelected);
      setMaxCount(props.selectedCount);
      handleCounter();
      props.handleItemSelect(props.data.id, isSelected);
      props.updateCounter(props.data.id, selectedCount);
    }
  }, [isSelected]);

  React.useEffect(() => {
    if (!props.data.isView && props.updateCounter) {
      setSelectedCount(selectedCount);
      props.updateCounter(props.data.id, selectedCount);
    }
  }, [selectedCount]);

  React.useEffect(() => {
    setMaxCount(props.selectedCount);
  }, [props.selectedCount]);

  React.useEffect(() => {
    setSelected(false);
    setSelectedCount(0);
  }, [props.data]);

  if (props.data.type === 'link' || props.data.type === 'Link') {
    return (
      <Paper className={clsx(classes.root, {
                [classes.isSelected]: isSelected
            })}
        onClick={() => props.isView ? setSelected(!isSelected) : null}>
        
        {props.isView ?
            <Badge 
              className={classes.counter}
              color="primary"
              badgeContent={isSelected && props.data.selectedCount && props.data.selectedCount > 0 ? props.data.selectedCount : null}
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