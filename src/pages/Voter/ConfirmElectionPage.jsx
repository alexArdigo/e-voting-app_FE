import React, {useState} from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import {toast} from "react-toastify";
import {useUserContext} from "../../services/UserContext";


const ConfirmElectionPage = () => {
    const {setIsVoting} = useUserContext();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedElectionName = location.state?.selectedElectionName;
    const [confirmed, setConfirmed] = useState(false);

    const handleStartVoting = async () => {
        if (!confirmed) {
            toast("Confirme que compreende as condições para votar.");
        } else {
            setIsVoting(true);
            navigate("/ballot", {
                state: {
                    electionId: location.state.selectedElectionId,
                    electionName: selectedElectionName
                }
            });
        }
    }

    return (
        <>
            <MainLayout >

                <StyledContainer variant="transparent" className="dflxColumn"> {/*, marginRight: "300px"*/}
                    <StyledContainer variant="tranparent">
                        <p>Selecionou:</p>
                        <h1 style={{fontSize: "50px", padding: "30px"}}>{selectedElectionName || "Nome da eleição não disponível"}</h1>
                    </StyledContainer>
                    <StyledContainer variant="warning">
                        <p>Atenção! Ao clicar em “Votar” será redirecionado para o seu boletim de voto eletrónico.
                            Terá 5 minutos para submeter o seu voto. </p>
                        <label>
                            <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                <input style={{padding: "10px"}} type="checkbox" id="dataConfirmation"
                                       name="dataConfirmation" onChange={() => setConfirmed(!confirmed)}/>
                                <p> Compreendo </p>
                            </div>
                        </label>
                    </StyledContainer>
                    <div className={"button-wrapper"}>
                        <button
                            className="vote-button"
                            onClick={() => handleStartVoting()}
                        >
                            Votar
                        </button>

                    </div>
                </StyledContainer>

            </MainLayout>

        </>
    )
        ;
};

export default ConfirmElectionPage;