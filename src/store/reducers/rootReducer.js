import authReducer from './authReducer';
import projectsReducer from './projectsReducer'

import { combineReducers } from 'redux';

import { firestoreReducer   } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;