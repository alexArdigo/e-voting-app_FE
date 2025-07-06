import React from 'react';

const FormInput = ({input, handleChange}) => {
    const {label, type, name, value} = input;
    return (
        <div className={"dInFlex"} style={{marginBottom: 20, width: type === "text" && '100%'}}>
            <label htmlFor={`input-${name}`}>
                {label}:
            </label>
            <input
                id={`input-${name}`}
                style={{marginLeft: "10px", flex: 2}}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                required
            />
        </div>
    );
};

export default FormInput;