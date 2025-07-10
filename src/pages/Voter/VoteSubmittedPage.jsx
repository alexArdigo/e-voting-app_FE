import React, {useEffect} from 'react';
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import api from "../../services/api";
import {useLocation, useNavigate} from "react-router-dom";
import {useUserContext} from "../../services/UserContext";

const VoteSubmittedPage = () => {
    const {user, setUser} = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    const {electionId} = location.state || {};

    const handleLogout = async () => {
        try {
            await api.get("/logout");

            if (user?.isVoting) {
                const body = new FormData();
                body.set("electionId", electionId);
                body.set("voter", user?.id);
                await api.post("/voters/stop-voting", body);
            }
            setUser(null);
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