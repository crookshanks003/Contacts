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
    LOAD_CONTACT,
    CLEAR_CONTACT,
} from "../types";
import axios from "axios";

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filter: null,
        loading: true,
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    const loadContact = async () => {
        const data = await axios.get("/api/contacts", {
            headers: { "x-auth-token": localStorage.getItem("token") },
        });
        dispatch({ type: LOAD_CONTACT, payload: data.data });
    };

    const addContact = async contact => {
        console.log("adding contact");
        const data = await axios.post("/api/contacts", contact, {
            headers: { "x-auth-token": localStorage.getItem("token") },
        });
        dispatch({ type: ADD_CONTACT, payload: data.data });
        console.log("contact added");
    };

    const deleteContact = async id => {
        await axios.delete(`/api/contacts/${id}`, {
            headers: { "x-auth-token": localStorage.getItem("token") },
        });
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    const setCurrent = contact =>
        dispatch({ type: ADD_CURRENT, payload: contact });

    const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

    const updateContact = async contact => {
        await axios.put(`/api/contacts/${contact._id}`, contact, {
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        });
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };
    const setFilter = text => dispatch({ type: SET_FILTER, payload: text });

    const clearFilter = () => dispatch({ type: CLEAR_FILTER });

    const clearContacts = () => dispatch({type: CLEAR_CONTACT})

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filter: state.filter,
                loading: state.loading,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                setFilter,
                clearFilter,
                loadContact,
                clearContacts,
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
