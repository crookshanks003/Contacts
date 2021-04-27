import ErrorContext from "./ErrorContext";
import ErrorReducer from "./errorReducer";
import { useReducer } from "react";
import { CLEAR_ALERT, SET_ALERT } from "../types";
import { v4 } from "uuid";

const ErrorState = props => {
    const initialState = [];

    const [state, dispatch] = useReducer(ErrorReducer, initialState);

    const setAlert = (msg, type, time = 4000) => {
        const id = v4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });

        setTimeout(() => dispatch({ type: CLEAR_ALERT, payload:id }), time);
    };

    return (
        <ErrorContext.Provider
            value={{
                alerts: state,
                setAlert
            }}>
            {props.children}
        </ErrorContext.Provider>
    );
};

export default ErrorState;
