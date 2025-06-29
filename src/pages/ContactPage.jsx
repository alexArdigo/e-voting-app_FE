import React from 'react';
import MainLayout from "./MainLayout.jsx";
import HalfLogo from "./HalfLogo.jsx";
import StyledContainer from "./StyledContainer.jsx";

const ContactPage = () => {
    return (

        <>
            <MainLayout>
                <StyledContainer variant="warning" style={{ padding: "100px" }}>
                    <h1>Contact Us</h1>
                    <p>If you have any questions or need assistance, please reach out to us at:</p>
                </StyledContainer>
            </MainLayout>

            <HalfLogo></HalfLogo>
        </>


    );
};

export default ContactPage;