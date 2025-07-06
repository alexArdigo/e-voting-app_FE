import React, {useState} from 'react';


import {useNavigate, useLocation} from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import StyledContainer from "../../layouts/StyledContainer.jsx";
import {toast} from "react-toastify";


const ConfirmElectionPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedElectionName = location.state.selectedElectionName;
    const [confirmed, setConfirmed] = useState(false);

    const handleCheckboxChange = () => {
        if (!confirmed) {
            toast("Confirme que compreende as condições para votar.");
        } else {
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
            <MainLayout style={{minHeight: "100vh"}}> {/*, justifyContent: "space-between"*/}
                {/*<div style={{justifyContent: "center", marginLeft: "500px", marginTop: "180px"}}>*/}
                {/*    <img src="public/images/legislativas-viewer.png" alt="side-image" height="300px" ></img>*/}
                {/*</div>*/}

                <StyledContainer variant="transparent" className="dflxColumn" style={{padding: "140px"}}> {/*, marginRight: "300px"*/}
                    <StyledContainer variant="tranparent" style={{width: "600px"}}>
                        <p>Selecionou:</p>
                        <h1 style={{fontSize: "50px"}}>{selectedElectionName || "Nome da eleição não disponível"}</h1>
                    </StyledContainer>
                    <StyledContainer variant="warning" style={{width: "600px"}}>
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
                            onClick={() => handleCheckboxChange()}
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