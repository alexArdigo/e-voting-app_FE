import React from "react";

const StyledContainer = ({ children, style, className }) => (
    <div
        className="className"
        style={{
            padding: "24px",
            borderRadius: "12px",
            background: "#f5f5f5",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            margin: "16px 0",
            ...style
        }}
    >
        {children}
    </div>
);

export default StyledContainer;