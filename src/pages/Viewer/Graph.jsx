import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StyledContainer from "../../layouts/StyledContainer";
import {useUserContext} from "../../services/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Graph = () => {
    const {user} = useUserContext();

    return (

        <div style={{height: "100vh"}}>

            <MainLayout>
                <StyledContainer variant="defaultTransparent" className="dflxRow" style={{height: "100%"}}>

                    <StyledContainer variant="defaultContained" className="dflxColumn" style={{height: "100%"}}>


                        <img src="public/images/ProfilePic.png" height="150px" alt="Profile"/>

                        <div className="user-side-profile">
                            <p><strong> Utilizador com sessão iniciada </strong></p>
                            <p> Último acesso: {user?.lastLogin || null}</p>
                            <p> Nome: {user?.name || null}</p>
                            <p> Nome de utilizador: {user?.username || null}</p>
                            <p> Instituição: {user?.institutionName || null}</p>


                        </div>
                        <div className="dflxColumn" >
                            {/*<button className="side-bar-button"> Editar perfil </button>*/}
                            <button className="side-bar-button"> Sair </button>
                        </div>

                    </StyledContainer>

                </StyledContainer>
                <StyledContainer variant="DefaultTransparent" style={{minWidth:"70vw"}}>
                    <p></p>
                </StyledContainer>
            </MainLayout>

        </div>

    );
};

export default Graph;