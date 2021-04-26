import React from "react";
import Contacts from "../contacts/Contacts";
import Form from "../contacts/Form";
import Search from "../contacts/Search";

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <Form />
            </div>
            <div>
                <Search />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
