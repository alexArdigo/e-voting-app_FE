import React from 'react';
import MainLayout from "../../layouts/MainLayout";
import StyledContainer from "../../components/specific/StyledContainer";

const ViewerSideBar = () => {
    return (


        <div style={{height: "100vh"}}>

            <MainLayout style={{ height: "100vh", width:"100vw"}}>
                <StyledContainer variant="DefaultTransparent" style={{minWidth:"30vw"}}>
                    <StyledContainer variant="defaultContained" className="dflxColumn" style={{heigth: "100px", width: "200px"}}>
                        <img src="public/images/ProfilePic.png" height="150px"/>
                        <div className="user-side-profile" style={{ lineHeight: 0.5 }}>
                            <p color="green"><strong> Viwer logged in! </strong></p>
                            <p>Last Login: 2023-10-01</p>
                            <p >User: AnaMoura</p>


                        </div>
                        <div className="dflxColumn" >
                            <button className="side-bar-button"> Profile </button>
                            <button className="side-bar-button"> Loggout </button>
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

export default ViewerSideBar;