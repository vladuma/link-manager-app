const initState = {};

const projectsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_PROJECT':
            console.log('CREATE_PROJECT', action);
            return state;
        case 'CREATE_PROJECT_ERROR':
            console.log('CREATE_PROJECT_ERROR', action);
            return state;
        case 'DELETE_PROJECT':
            console.log('DELETE_PROJECT', action);
            return state;
        case 'DELETE_PROJECT_ERROR':
            console.log('DELETE_PROJECT_ERROR', action);
            return state;
        case 'EDIT_PROJECT':
            console.log('EDIT_PROJECT', action);
            let edit = action.payload;

            return edit;
        case 'EDIT_PROJECT_ERROR':
            console.log('EDIT_PROJECT_ERROR', action);
            return state;
        default:
            return state;
    }
};

export default projectsReducer;