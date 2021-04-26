import {
    ADD_CONTACT,
    ADD_CURRENT,
    CLEAR_CURRENT,
    DELETE_CONTACT,
    SET_FILTER,
    CLEAR_FILTER,
    UPDATE_CONTACT,
} from "../types";

const ContactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== action.payload
                ),
            };

        case ADD_CURRENT:
            return {
                ...state,
                current: action.payload,
            };

        case CLEAR_CURRENT:
            return { ...state, current: null };

        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };

        case SET_FILTER:
            return {
                ...state,
                filter: state.contacts.filter(contact => {
                    const text = new RegExp(`${action.payload}`, "gi");
                    return (
                        contact.name.match(text) ||
                        contact.email.match(text) ||
                        contact.phone.match(text)
                    );
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filter: null,
            };

        default:
            return state;
    }
};

export default ContactReducer;
