import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ColorPicker from './colorPicker';
import Options from '../../actionBtns/optionsBtn';
import Filters from '../../actionBtns/fliters';
import Switch from './projectSwitch';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
        margin: theme.spacing(1),
        marginLeft: 0,
        // width: 200,
    },
},
}));

const Title = (props) => {
    const classes = useStyles();
    
    const handleChange = (e) => {
        props.handleTitle(e.target.value);
    }

    return (
        props.isEditMode ?
            <div className={classes.root}>
                <TextField id="standard-basic" label="Name" defaultValue={props.name} onChange={handleChange}/>
                <Switch handleChange={props.handleProjectPrivacy} status={props.status}/>
                <ColorPicker
                    color={props.color ? props.color : ''}
                    handleColor={color => props.handleColor(String(color))}
                />
            </div>
            :
            <h1 className={classes.root}>
                {props.project.name}
                <Options project={props.project} />
                <Filters items={props.items} handleFilter={props.handleFilter}/>
            </h1>
        
    )
}

export default Title;