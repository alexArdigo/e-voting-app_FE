import React from 'react';
import MainLayout from "./MainLayout.jsx";
import HalfLogo from "./HalfLogo.jsx";
import StyledContainer from "./StyledContainer.jsx";

const ContactPage = () => {
    return (

        <>
            <MainLayout>
                <StyledContainer variant="yellow" style={{ padding: "100px" }}>
                    <h1>Contact Us</h1>
                    <p>testing123...testing 1 2 3 </p>
                </StyledContainer>
            </MainLayout>

            <HalfLogo></HalfLogo>
        </>


    );
};

export default ContactPage;