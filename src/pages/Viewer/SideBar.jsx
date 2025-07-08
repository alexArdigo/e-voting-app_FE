import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StyledContainer from "../../layouts/StyledContainer";
import {useUserContext} from "../../services/UserContext";

const SideBar = () => {
    const {user} = useUserContext();

    return (

        <div style={{height: "100vh"}}>

            <MainLayout style={{ height: "100vh", width:"100vw"}}>
                <StyledContainer variant="DefaultTransparent" style={{minWidth:"30vw"}}>

                    <StyledContainer variant="defaultContained" className="dflxColumn" style={{height: "100px", width: "200px"}}>

                        <img src="public/images/ProfilePic.png" height="150px" alt="Profile"/>

                        <div className="user-side-profile" style={{ lineHeight: 0.5 }}>
                            <p color="green"><strong> Utilizador com sessão iniciada! </strong></p>
                            <p> Último acesso: {user?.lastLogin || null}</p>
                            <p> Nome: {user?.name || null}</p>
                            <p> Nome de utilizador: {user?.username || null}</p>
                            <p> Instituição: {user?.instituitionName || null}</p>


                        </div>
                        <div className="dflxColumn" >
                            {/*<button className="side-bar-button"> Edit profile </button>*/}
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

export default SideBar;