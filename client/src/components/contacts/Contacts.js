import React, { useContext } from "react";
import ContactsContext from "../../context/Contacts/contactsContext";
import Contact from "./Contact";
const Contacts = () => {
    const contactsContext = useContext(ContactsContext);
    const contacts = contactsContext.contacts
    return (
        <div>
            {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
            ))}
        </div>
    );
};

export default Contacts;
