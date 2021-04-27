import {
    CLEAR_ERROR,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOAD_USER,
    LOAD_FAILED,
} from "../types";

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS: {
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            };
        }
        case REGISTER_FAILED: {
            localStorage.removeItem("token");
            return {
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        }
        case LOAD_USER: {
            return { ...state, isAuthenticated: true, user: action.payload };
        }
        case LOAD_FAILED: {
            return { ...state, isAuthenticated: false, user: null };
        }
        case CLEAR_ERROR: {
            return { ...state, error: null };
        }
        default:
            return state;
    }
};

export default authReducer;
