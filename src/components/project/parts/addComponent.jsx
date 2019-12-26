import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import EditBtns from './editBtns';
import {processLink} from '../../misc/testUrl';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2, 1),
    margin: '10px 0',
    position: 'relative'
    },
    input: {
        maxWidth: 300,
        width: '100%',
        '& > *': {
            width: '100%'
        }
    },
}));

export default function Add (props) {
  const classes = useStyles();
  const [content, setContent] = React.useState(props.data && props.data.content ? props.data.content :'');
  const [description, setDescription] = React.useState(props.data && props.data.description ? props.data.description : '');
  
  const handleAdd = () => {
    props.handleAdd({
      id: props.id,
      content: content,
      description: description,
      type: props.type ? props.type : 'link',
      created: new Date()
    });
  }
  const handleDelete = () => {
    console.log('delete btn');
    props.handleDelete(props.id);
  }
  const handleContent = (e) => {
    setContent(e.target.value);
  }
  const handleLink = (e) => {
    const link = e.target.value;
    console.log(123, processLink(link));
    setContent(processLink(link));
  }
  const handleDescription = (e) => {
    setDescription(e.target.value);
  }
  console.log(props.type);
  if(props.type === 'note') {
    return (
      <Paper className={classes.root}>
          <div className={classes.input}>
              <TextField id="standard-basic" label="Name" defaultValue={props.data && props.data.content ? props.data.content : ''} onChange={handleContent}/>
          </div>
          <div className={classes.input}>
              <TextField id="standard-basic" label="Description" defaultValue={props.data && props.data.description ? props.data.description : ''} onChange={handleDescription} multiline rows= "4" />
          </div>
          <EditBtns isEditMode={true} handleDelete={handleDelete} handleAdd={handleAdd} />
      </Paper>
    );
  } else {
    return (
      <Paper className={classes.root}>
          <div className={classes.input}>
              <TextField id="standard-basic" label="Link" defaultValue={props.data && props.data.content ? props.data.content : ''} onChange={handleLink}/>
          </div>
          <div className={classes.input}>
              <TextField id="standard-basic" label="Name" defaultValue={props.data && props.data.description ? props.data.description : ''} onChange={handleDescription}/>
          </div>
          <EditBtns isEditMode={true} handleDelete={handleDelete} handleAdd={handleAdd} />
      </Paper>
    );
  }
}