import React, { useRef, useContext } from "react";
import ContactContext from "../../context/Contacts/contactsContext";

const Search = () => {
    const contactContext = useContext(ContactContext);

    const text = useRef("");

    const setFilter = e => {
        e.preventDefault();
        if (text.current.value !== null) {
            contactContext.setFilter(e.target.value);
        } else {
            contactContext.clearFilter();
        }
    };

    return (
        <form>
            <input
                type="text"
                onChange={setFilter}
                ref={text}
                name="search"
                placeholder="Search..."
            />
        </form>
    );
};

export default Search;
