import React, { useReducer } from "react";
import ContactReducer from "./contactsReducer";
import ContactContext from "./contactsContext";
import { ADD_CONTACT } from "../types";
import {v4 as uuidv4} from 'uuid'

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
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const addContact = contact => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                addContact,
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
