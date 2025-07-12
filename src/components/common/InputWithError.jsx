import React from "react";

const InputWithError = ({error}) => {
  return (
      <div className={"dflxColumn"} style={{width: "100%"}}>
        {error && (
            <small style={{ color: "var(--black-eleGov" }}>{error}</small>
        )}
      </div>
  );
}



export default InputWithError;

