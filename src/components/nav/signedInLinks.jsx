import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { logout } from '../../store/actions/authActions';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from "@material-ui/core/styles";

import { Divider } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Options from '../actionBtns/optionsBtn';

const useStyles = makeStyles(theme =>( {
    nested: {
        paddingLeft: theme.spacing(4),
        '& > div:first-child' : {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        },
    },
    nestedOpen: {
        '& > div:not(:first-child)' : {
            display: 'block'
        },
    },
    nestedClosed: {
        '& > div:not(:first-child)': {
            display: 'none'
        },
        '& > div:first-child' : {
            margin: 0,
        },
    },
    list: {
        height: '100%'
    },
    lastItem: {
        position: 'absolute!important',
        bottom: 35
    },
    swatch: {
        width: 15,
        height: 15,
        borderRadius: '3px',
        // border: '1px solid ',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        margin: '0 7px',
    },
}));

const signedInLinks = (props) => {
    const { auth } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    let history = useHistory();

    const handleProjectClick = (project) => {
        history.push({pathname: '/project/' + project.id, state: project});
    }
    const handleProjects = (e) => {
        props.handleDrawerOpen(e);
        setOpen(!open);
    }
    const handleEmptyProjects =(e) => {
        props.handleDrawerOpen(e);
    }
    const renderLink = (text, index) => {
        switch(index) {
            case 0:
                return (<ListItem button key={text} component={NavLink} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>);
            case 1:

                if (props.projects && props.projects.length) {
                    return (
                        <div key={text}>
                            <ListItem button onClick={handleProjects}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                {props.projects.map((project) => (
                                    <ListItem button className = {
                                        clsx(classes.nested, {
                                            [classes.nestedOpen]: props.open,
                                            [classes.nestedClosed]: !props.open
                                        })
                                    }
                                    key = {project.id}
                                    onClick = {() => handleProjectClick(project)} >
                                        <div className={classes.swatch} style={{backgroundColor: project.backgroundColor}}/>
                                        <ListItemText primary={project.name} />
                                        <Options project={project} />
                                    </ListItem>
                                ))}
                                </List>
                            </Collapse>
                        </div>
                    )
                } else {
                    return (<ListItem button key={text} onClick={handleEmptyProjects}>
                                <ListItemIcon>
                                    <FolderIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>);

                }
            case 2:
                return (<div key={text}>
                            <Divider/>
                            <ListItem button onClick={props.logout}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </div>);

                    
        }
    }
    
   
    return (
        <List className={classes.list}>
          {["Home", "Projects", "Logout"].map((text, index) => (            
                renderLink(text, index)
          ))}
            <ListItem button className={classes.lastItem} component={NavLink} to="/settings">
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItem>
        </List>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        auth: state.firebase.profile,
        projects: state.firestore.ordered.projects
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(signedInLinks);