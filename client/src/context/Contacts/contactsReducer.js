import {
    ADD_CONTACT,
    ADD_CURRENT,
    CLEAR_CURRENT,
    DELETE_CONTACT,
    SET_FILTER,
    CLEAR_FILTER,
    UPDATE_CONTACT,
    LOAD_CONTACT,
    CLEAR_CONTACT
} from "../types";

const ContactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact._id !== action.payload
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
                    contact._id === action.payload._id ? action.payload : contact
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

        case LOAD_CONTACT: {
            return {
                ...state,
                contacts: action.payload,
                loading: false
            };
        }
        case CLEAR_CONTACT: {
            return {
                ...state, 
                contacts: [],
                loading: false
            }
        }
        default:
            return state;
    }
};

export default ContactReducer;
