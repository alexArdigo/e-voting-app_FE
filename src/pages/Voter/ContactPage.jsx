import React from 'react';
import MainLayout from "../../layouts/MainLayout.jsx";
import HalfLogo from "../../components/common/HalfLogo.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import "../../App.css"

const ContactPage = () => {
    return (

        <>
            <MainLayout style={{minHeight: "100vh"}} className="dflx">
                <StyledContainer variant="leftCentered" style={{marginBlock:"10px", marginRight:"50px"}}>
                    <h1>
                        Contactos &<br/> Atendimento
                    </h1>
                </StyledContainer>
                <StyledContainer variant="transparent" style={{lineHeight:"2em"}}>
                        <h1> Localização: </h1>
                        <p>Av. D. Carlos I, 134 - 5.º
                        1200-651 LISBOA <br/>
                        Telef.: +351 21 3923800 <br/>
                        Fax: +351 21 3953543 <br/>
                        e-mail: cne@cne.pt </p>

                        <h1> Atendimento: </h1>
                    <p> Segunda a Sexta-feira - 09h00/13h00-14h00/18h00 <br/>
                        Em eleição/referendo de âmbito territorial nacional ou regional:<br/>
                        A partir da marcação do ato (dias úteis) -	09h00-19h00<br/>
                        Nos 13 dias anteriores à eleição/referendo -	08h00-20h00<br/>
                        No dia da eleição/referendo -	07h00-21h00
                    </p>

                </StyledContainer>
            </MainLayout>
        </>


    );
};

export default ContactPage;