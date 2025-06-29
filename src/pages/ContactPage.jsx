import React from 'react';
import MainLayout from "./MainLayout.jsx";
import HalfLogo from "./HalfLogo.jsx";
import StyledContainer from "./StyledContainer.jsx";
import "../App.css"

const ContactPage = () => {
    return (

        <>
            <MainLayout>
                <StyledContainer variant="transparent" style={{ padding: "100px", width:"400px" }}>
                    <h1 className="pt-sans-bold">Contact Us</h1>
                    <p>
                        <h1> Localização: </h1>

                        Av. D. Carlos I, 134 - 5.º
                        1200-651 LISBOA <br/>
                        Telef.: +351 21 3923800 <br/>
                        Fax: +351 21 3953543 <br/>
                        e-mail: cne@cne.pt


                        <h1>Atendimento: </h1>

                        Segunda a Sexta-feira - 09h00/13h00-14h00/18h00

                        Em eleição/referendo de âmbito territorial nacional ou regional:

                        A partir da marcação do ato (dias úteis) -	09h00-19h00
                        Nos 13 dias anteriores à eleição/referendo -	08h00-20h00
                        No dia da eleição/referendo -	07h00-21h00
                    </p>
                </StyledContainer>
            </MainLayout>
            <HalfLogo></HalfLogo>
        </>


    );
};

export default ContactPage;