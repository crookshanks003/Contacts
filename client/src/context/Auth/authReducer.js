import {
    CLEAR_ERROR,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    LOAD_USER,
    LOAD_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_USER,
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
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        }
        case LOAD_USER: {
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
            };
        }
        case LOAD_FAILED: {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            };
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem("token", action.payload.token);
            return { ...state, isAuthenticated: true, loading: false };
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
            };
        }
        case CLEAR_ERROR: {
            return { ...state, error: null };
        }
        case LOGOUT_USER: {
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                loading: false,
            };
        }
        default:
            return state;
    }
};

export default authReducer;
