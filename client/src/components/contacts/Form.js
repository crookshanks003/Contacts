import React, { useState, useContext } from "react";
import ContactContext from "../../context/Contacts/contactsContext";

const Form = () => {
    const [contact, setContact] = useState({
        email: "",
        name: "",
        phone: "",
        type: "personal",
    });

    const contactContext = useContext(ContactContext);

    const onChange = e =>
        setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            email: "",
            name: "",
            phone: "",
            type: "personal",
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={contact.name}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
                value={contact.email}
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
            <div>
                <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-primary btn-block"
                />
            </div>
        </form>
    );
};

export default Form;
