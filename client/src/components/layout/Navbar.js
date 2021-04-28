import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/Auth/AuthContext";
import { useContext } from "react";
import ContactContext from "../../context/Contacts/contactsContext";

const Navbar = ({ title, icon }, props) => {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext)

    const onClick = e => {
        authContext.logOut();
        contactContext.clearContacts();
    };

    const authLinks = (
        <>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
        </>
    );
    const guestLinks = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <a href="#!" onClick={onClick}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="sm-hide"> Logout</span>
                </a>
            </li>
        </>
    );
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>{authContext.isAuthenticated ? guestLinks : authLinks}</ul>
        </div>
    );
};

Navbar.protoTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: "Contacts",
    icon: "fas fa-id-card-alt",
};

export default Navbar;
