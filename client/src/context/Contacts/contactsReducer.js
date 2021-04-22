import { ADD_CONTACT } from "../types";

const ContactReducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
            };

        default:
            return state;
    }
};

export default ContactReducer;
