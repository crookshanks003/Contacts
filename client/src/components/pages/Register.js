import React, { useState, useContext, useEffect } from "react";
import ErrorContext from "../../context/error/ErrorContext";
import AuthContext from "../../context/Auth/AuthContext";

const Register = props => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const errorContext = useContext(ErrorContext);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.error && authContext.error.type === "register") {
            errorContext.setAlert("User already exist", "danger");
            authContext.clearError();
        }
        if (localStorage.getItem("token")) {
            props.history.push("/");
        }
    }, [authContext, errorContext,props]);

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (user.password !== user.password2) {
            errorContext.setAlert("Password does not match", "danger");
        } else {
            authContext.registerUser(user);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        required
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                        type="password"
                        name="password2"
                        value={user.password2}
                        onChange={onChange}
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block"
                />
            </form>
        </div>
    );
};

export default Register;
