import React from 'react';

import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useHistory } from "react-router-dom";
import KeyboardEventHandler from "react-keyboard-event-handler";
import AddBtn from '../actionBtns/addBtn';
import Card from './card';
import Preloader from './preloader';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Dashboard = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const handleNew = (e) => {
        e.preventDefault();
        history.push('create');
    }

    return(
        <div className={classes.root}>
            <h1>Dashboard</h1>
            <Grid container spacing={3}>
                {props && props.projects && props.projects.length ?
                        props.projects.map((project, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={idx} >
                                <Card project={project} id={project.id} />
                            </Grid>
                        ))
                    :
                        <Preloader/>
                }
            </Grid>
            <AddBtn action="addProject"/>
            <KeyboardEventHandler handleKeys={['shift+n']} onKeyEvent={(key, e) => handleNew(e)} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'projects',
        where: ['uid', '==', (props.auth.uid ? props.auth.uid : '')]
    }])
)(Dashboard);