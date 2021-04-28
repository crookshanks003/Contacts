import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import Contacts from "../contacts/Contacts";
import Form from "../contacts/Form";
import Search from "../contacts/Search";

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(() => authContext.loadUser(),
    // eslint-disable-next-line
    []);
    return (
        <div className="grid-2">
            <div>
                <Form />
            </div>
            <div>
                {authContext.user && (
                    <h2 className="text-center">
                        Welcome{" "}
                        <span className="text-primary">
                            {authContext.user.name}
                        </span>
                    </h2>
                )}
                <Search />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
