import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/Contacts/contactsContext";

const Form = () => {
    const contactContext = useContext(ContactContext);
    const { current } = contactContext;
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                email: "",
                name: "",
                phone: "",
                type: "personal",
            });
        }
    }, [contactContext, current]);

    const [contact, setContact] = useState({
        email: "",
        name: "",
        phone: "",
        type: "personal",
    });

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const allClear = () => {
        contactContext.clearCurrent();
    };

    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            contactContext.addContact(contact);
        } else {
            contactContext.updateContact(contact);
        }
        allClear();
    };

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current === null ? "Add Contact" : "Update Contact"}
            </h2>
            <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={contact.name}
                required
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                value={contact.email}
                required
            />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={onChange}
                value={contact.phone}
            />
            <input
                type="radio"
                name="type"
                value="personal"
                checked={contact.type === "personal"}
                onChange={onChange}
            />
            <span className="mr-1"> Personal</span>
            <input
                type="radio"
                name="type"
                value="professional"
                checked={contact.type === "professional"}
                onChange={onChange}
            />{" "}
            Professional
                <input
                    type="submit"
                    value={current === null ? 'Add Contact' : 'Update Contact'}
                    className="btn btn-primary btn-block"
                />
            {current && (
                    <button
                        className="btn btn-light btn-block"
                        onClick={allClear}>
                        Cancel
                    </button>
            )}
        </form>
    );
};

export default Form;
