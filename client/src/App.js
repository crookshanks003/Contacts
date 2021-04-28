import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ContactState from "./context/Contacts/ContactsState";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import AuthState from "./context/Auth/authState";
import ErrorState from "./context/error/errorState";
import Error from "./components/layout/Error"
import PrivateRoute from "./components/pages/PrivateRoute"

function App() {
    return (
        <AuthState>
            <ContactState>
                <ErrorState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className="container">
                                <Error/>
                                <Switch>
                                    <PrivateRoute exact path="/" component={Home} />
                                    <Route
                                        exact
                                        path="/about"
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </ErrorState>
            </ContactState>
        </AuthState>
    );
}

export default App;
