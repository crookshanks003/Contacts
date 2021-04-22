import "./App.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ContactState from "./context/Contacts/ContactsState";

function App() {
    return (
        <ContactState>
            <Router>
                <Fragment>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </ContactState>
    );
}

export default App;
