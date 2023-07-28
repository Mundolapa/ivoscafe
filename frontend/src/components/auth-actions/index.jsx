export const loginSuccess = (token, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {
        token,
        user,
    },
});

// authReducer.js
const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    // other relevant state properties
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
            };
        // other cases and reducers
        default:
            return state;
    }
};

export default authReducer;
