import AuthContext from "./AuthContext";
import AuthReducer from "./authReducer";
import { useReducer } from "react";
import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CLEAR_ERROR,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOAD_USER,
    LOAD_FAILED,
} from "../types";

const AuthState = props => {
    const initialState = {
        user: null,
        isAuthenticated: false,
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const loadUser = async token => {
        try {
            if (localStorage.getItem("token")) {
                const data = await axios.get("/api/login", {
                    headers: { "x-auth-token": state.token },
                });
                dispatch({ type: LOAD_USER, payload: data.data });
            }
        } catch (error) {
            dispatch({ type: LOAD_FAILED, payload: error.response.data.error });
        }
    };

    const registerUser = async user => {
        try {
            const data = await axios.post(
                "/api/users",
                {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            dispatch({ type: REGISTER_SUCCESS, payload: data.data });
            loadUser(localStorage);
        } catch (error) {
            dispatch({
                type: REGISTER_FAILED,
                payload: error.response.data.error,
            });
        }
    };

    const loginUser = async user => {
        try {
            const data = await axios.post(
                "/api/login",
                {
                    email: user.email,
                    password: user.password,
                },
                { headers: { "Content-Type": "application/json" } }
            );
            dispatch({ type: LOGIN_SUCCESS, payload: data.data });
        } catch (error) {
            dispatch({
                type: LOGIN_FAILED,
                payload: error.response.data.error,
            });
        }
    };

    const clearError = () => {
        dispatch({ type: CLEAR_ERROR });
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuth: state.isAuthenticated,
                token: state.token,
                error: state.error,
                registerUser,
                clearError,
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
