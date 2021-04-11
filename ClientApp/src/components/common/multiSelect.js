import React from 'react';
import MultiSelect from "react-multi-select-component";
const MSelect = ({ name, label, error, options, selected, ...rest }) => {
    return (
        <div className="">
            <label htmlFor={name}>{label}</label>
            <MultiSelect
                {...rest}
                name={name}
                id={name}
                options={options}
                value={selected}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default MSelect;