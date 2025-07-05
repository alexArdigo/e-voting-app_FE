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
        width: "400px",
    },
    transparent: {
        borderRadius: "12px",
        margin: "16px 0",
        padding: "100px",
        width:"400px",
    },
    leftCentered: {
        display: "flex",
    },
    flex: {
        padding: "25px",
        margin: "10px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    warning: {
        padding: "10px",
        borderRadius: "12px",
        background: "#fff3cd",
        border: "2px solid #ffeeba",
        color: "#856404",
        paddingInline: "30px",
        width: "600px",
    },
    defaultTransparent: {
        justifyContent: "center",
        alignItems: "center",

    },
    defaultContained: {
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        margin: "30px",
        justifyContent: "left",
        // background: "#f5f5f5",
    },
};

const StyledContainer = ({ children, style, className, variant = "default", ref }) => (
    <div
        ref={ref}
        className={className}
        style={{...variants[variant], ...style}}
    >
        {children}
    </div>
);

export default StyledContainer;