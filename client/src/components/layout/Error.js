import React, { useContext } from "react";
import ErrorContext from "../../context/error/ErrorContext";

const Error = () => {
    const alertContext = useContext(ErrorContext);
    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}> <i className="fas fa-info-circle"></i> {alert.msg}</div>
        ))
    );
};

export default Error;
