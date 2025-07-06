import React from 'react';

const FormTextareaInput = ({input, handleChange}) => {
    const {label, name, value} = input;

    return (
        <label >
            {label}
            <textarea
                style={{width: '-webkit-fill-available'}}
                name={name}
                value={value}
                onChange={handleChange}
            />
        </label>
    );
};

export default FormTextareaInput;