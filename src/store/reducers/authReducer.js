const initState = {};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log(action);
            return {
                ...state,
                authError: action.e
            }
        case 'LOGIN_SUCCESS':
            console.log('login succeess');
            return {
                ...state,
                authError: null
            }
        case 'LOGOUT_SUCCESS': 
            console.log('signout success');
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success');
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error', action)
            return {
                ...state,
                authError: action
            }
        case 'ACCOUNT_UPDATED':
            console.log('account updated')
            return {
                ...state,
                authError: null
            }
        case 'ACCOUNT_NOT_UPDATED':
            console.log('account updated error')
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
};

export default authReducer;