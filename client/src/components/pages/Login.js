import React, { useState, useContext } from "react";
import Error from "../layout/Error"
import ErrorContext from "../../context/error/ErrorContext"

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        showPassword: false,
    });
    const errorContext = useContext(ErrorContext)

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
        e.preventDefault();

    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={user.showPassword ? "text" : "password"}
                        name="password"
                        onChange={onChange}
                        required
                    />
                    <input
                        type="checkbox"
                        name="togglePassword"
                        onChange={e =>
                            setUser({
                                ...user,
                                showPassword: e.target.checked ? true : false,
                            })
                        }
                    />
                    <span> Show Password</span>
                </div>
                <input
                    type="submit"
                    value="Login"
                    className="btn btn-primary btn-block"
                />
            </form>
        </div>
    );
};

export default Login;
