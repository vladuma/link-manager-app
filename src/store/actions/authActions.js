export const login = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email, 
            credentials.password
        ).then(() => {
            dispatch({type: 'LOGIN_SUCCESS'});
        }).catch((e) => {
            dispatch({type: 'LOGIN_ERROR', e});
        })
    }
}

export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'})
        });
    }
}
export const saveAccount = (data) => {
    return (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore(),
              state = getState();

        firestore.collection('user').doc(state.firebase.auth.uid).set({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            initials: data.firstName[0] + data.lastName[0]
        }).then(() => {
            dispatch({type: 'ACCOUNT_UPDATED'})
        }).catch((err) => {
            dispatch({type: 'ACCOUNT_NOT_UPDATED', err})
        });
    }
}

export const signup = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        if (newUser.password !== newUser.passwordConf) {
            const err = {
                message: 'Passwords do not match.'
            };
             dispatch({type: 'SIGNUP_ERROR', err})
        } else {
            firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            ).then((resp) => {
                return firestore.collection('user').doc(resp.user.uid).set({
                    email: newUser.email
                });
            }).then(() => {
                dispatch({type: 'SIGNUP_SUCCESS'});
            }).catch((err) => {
                dispatch({type: 'SIGNUP_ERROR', err});
            });
        }
        
    }
}