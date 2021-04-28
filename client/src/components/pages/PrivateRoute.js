import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import AuthContext from "../../context/Auth/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                !authContext.isAuthenticated && !authContext.loading ? (
                    <Redirect to="/login" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default PrivateRoute;
