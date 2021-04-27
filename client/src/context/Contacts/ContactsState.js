import React, { useReducer } from "react";
import ContactReducer from "./contactsReducer";
import ContactContext from "./contactsContext";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    ADD_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    SET_FILTER,
    CLEAR_FILTER,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Pritesh Mantri",
                email: "priteshpmantri@gmail.com",
                phone: "9423591543",
                type: "personal",
            },
            {
                id: 2,
                name: "Shivam Handa",
                email: "handashivam@gmail.com",
                phone: "9999999999",
                type: "professional",
            },
        ],
        current: null,
        filter: null,
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    const setCurrent = contact =>
        dispatch({ type: ADD_CURRENT, payload: contact });

    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

    const updateContact = contact =>
        dispatch({ type: UPDATE_CONTACT, payload: contact });

    const setFilter = text => dispatch({ type: SET_FILTER, payload: text });

    const clearFilter = () => dispatch({ type: CLEAR_FILTER });

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filter: state.filter,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                setFilter,
                clearFilter
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
