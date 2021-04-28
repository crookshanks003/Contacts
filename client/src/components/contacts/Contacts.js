import React, { useContext, useEffect } from "react";
import ContactsContext from "../../context/Contacts/contactsContext";
import Contact from "./Contact";
import Spinner from "../layout/Spinner"
const Contacts = () => {
    const contactsContext = useContext(ContactsContext);
    const { loadContact } = contactsContext;
    useEffect(() => loadContact(), 
    // eslint-disable-next-line
    []);
    const contacts = contactsContext.filter
        ? contactsContext.filter
        : contactsContext.contacts;
    return (
        <>
            {contactsContext.loading ? (
                <Spinner/>
            ) : (
                <div>
                    {contactsContext.contacts.length === 0 && (
                        <h3 className="mt-4 text-center">
                            Please add some contacts
                        </h3>
                    )}
                    {contacts.map(contact => (
                        <Contact key={contact._id} contact={contact} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Contacts;
