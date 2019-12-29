export const createProject = (project) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();
        const auth = getState().firebase.auth;
        return firestore.collection('projects').add({ 
            uid: auth.uid,
            dateCreated: new Date(),          
                ...project,
        }).then((res) => {
            console.log(res);
            dispatch({
                type: 'CREATE_PROJECT',
                project
            });
            return res.id;
        }).catch((error) => {
            dispatch({
                type: 'CREATE_PROJECT_ERROR',
                error
            });

        });
    }
}

export const deleteProject = (id) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firestore = getFirestore();

        return firestore.collection('projects').doc(id).delete()
        .then(() => {
            dispatch({
                type: 'DELETE_PROJECT'
            });
        }).catch((error) => {
            dispatch({
                type: 'DELETE_PROJECT_ERROR',
                error
            });

            console.log('firebase errorr:', error);
        })
    }
}

export const saveProjectEdit = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log('saveEdit', project)
        const firestore = getFirestore();

        if (project.id) {
            return firestore.collection('projects').doc(project.id).update({
                ...project
            })
            .then(() => {
                dispatch({
                    type: 'SAVE_PROJECT'
                });
            }).catch((error) => {
                dispatch({
                    type: 'SAVE_PROJECT_ERROR',
                    error
                });
                console.log('firebase error:', error);
            });
        } else {
            const auth = getState().firebase.auth;

            return firestore.collection('projects').add({
                uid: auth.uid,
                dateCreated: new Date(),
                ...project,
            }).then((res) => {
                console.log(res);
                return firestore.collection('projects').doc(res.id).update({
                    id: res.id
                }).then(() => {
                    const updated = {id: res.id, ...project}
                    console.log('updated', updated);
                    dispatch({
                        type: 'CREATE_PROJECT',
                        updated
                    });
                    return res.id;
                }).catch(e => {
                    console.log('error updating id', e);
                });
            }).catch((error) => {
                dispatch({
                    type: 'CREATE_PROJECT_ERROR',
                    error
                });

            });
        }
    };
};

export const uploadToStorage = (file) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const bucket = firebase.storage().ref();
        const dateCode = Date.now();
        const importRef = bucket.child('imports/' + dateCode + '_' + file.name);
        return importRef.put(file).then(res => {
            return res;
        })
    };
}