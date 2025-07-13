import React from "react";

const InputNoLabel = ({type, placeholder, value, handleOnChange, style}) => {
  return (
      <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => handleOnChange(e.target.value)}
          style={style}
      />
  );
}



export default InputNoLabel;

