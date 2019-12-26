import React from 'react';

import { connect } from 'react-redux';

import SignedInLinks from './signedInLinks';

const navBar = (props) => {
    const { auth } = props;
    const links = auth.uid ? <SignedInLinks handleDrawerOpen={props.handleDrawerOpen} open={props.open}/> : <div></div>;

    return links;
}

const mapStateToProps = (state) => {    
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(navBar);