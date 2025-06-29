import React from "react";

const variants = {
    default: {
        padding: "24px",
        borderRadius: "12px",
        background: "#f5f5f5",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        margin: "16px 0",
    },
    yellow: {
        padding: "24px",
        borderRadius: "12px",
        background: "#ffe082",
        border: "2px solid #ffb300",
        margin: "16px 0",
    },
};

const StyledContainer = ({ children, style, className, variant = "default" }) => (
    <div
        className={className}
        style={{...variants[variant], ...style}}
    >
        {children}
    </div>
);

export default StyledContainer;