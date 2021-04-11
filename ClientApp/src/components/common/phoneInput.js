import React from 'react';
import Input from 'react-phone-number-input/input'

const PhoneInput = ({ name, label, error, value, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Input
                {...rest}
                name={name}
                id={name}
                className="form-control"
                country="US"
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default PhoneInput;