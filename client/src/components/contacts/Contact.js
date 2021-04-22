import React from "react";

const Contact = ({ contact }) => {
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {contact.name}{" "}
                <span
                    style={{ float: "right" }}
                    className={
                        "badge " +
                        (contact.type === "professional"
                            ? "badge-success"
                            : "badge-primary")
                    }>
                    {contact.type}
                </span>
            </h3>
            <ul>
                {contact.email && (
                    <li>
                        <i className="fas fa-envelope-open"></i> {contact.email}
                    </li>
                )}
                {contact.phone && (
                    <li>
                        <i className="fas fa-phone"></i> {+contact.phone}
                    </li>
                )}
            </ul>
            <button className="btn btn-sm btn-dark mt"><i className="far fa-edit"></i></button>
            <button className="btn btn-danger btn-sm mt"><i className="far fa-trash-alt"></i></button>
        </div>
    );
};

export default Contact;
