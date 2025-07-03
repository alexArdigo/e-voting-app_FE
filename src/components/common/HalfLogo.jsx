import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../specific/StyledContainer.jsx";
import React from "react";

const HalfLogo = ({ ...props }) => {
    const style = {
        position: 'fixed',
        right: 0,
        bottom: '60px',
        zIndex: -1,
        maxWidth: '150px',
        height: 'auto',
        ...props.style,
    };

    return (
        <img
            src="/images/legislativas_halfLogo.png"
            alt="Arco decorativo"
            style={style}
            {...props}
        />
    );
};

export default HalfLogo;