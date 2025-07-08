import React, {useEffect} from 'react';
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import api from "../../services/api";
import {useNavigate} from "react-router-dom";

const VoteSubmittedPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await api.get("/logout");
            console.log("User logged out successfully");
        } catch (e) {
            console.error("Error logging out: " + e);
        } finally {
            setTimeout(() => {
                navigate("/", {replace: true});

            }, 3000); // Redirect after 3 seconds
        }
    };

    useEffect(() => {
        handleLogout();
    }, []);
    return (
        <>
            <MainLayout className="dflxColumn">
                <StyledContainer variant="transparent" style={{}}>
                    <h1>Eleição Presidencial 2025</h1>
                </StyledContainer>
                <StyledContainer variant="transparent"
                                 style={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <p>O seu voto foi submetido</p>
                </StyledContainer>
            </MainLayout>

        </>
    );
};

export default VoteSubmittedPage;