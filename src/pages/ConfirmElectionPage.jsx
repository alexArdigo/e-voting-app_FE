import React from 'react';


import {useNavigate, useLocation} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";


const ConfirmElectionPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const selectedElectionName = location.state.selectedElectionName;
    const [confirmed, setConfirmed] = useState(false);

    return (
        <>
        <MainLayout className="dflxColumn">
            <StyledContainer variant="tranparent" style={{paddingBlock: "100px"}}>
                <p>Selecionou:</p>
                <h1 style={{fontSize: "50px"}}>{selectedElectionName || "Nome da eleição não disponível"}</h1>
            </StyledContainer>
            <StyledContainer variant="warning" style={{width: "600px", justifyContent: "center"}} >
                <p>Ao clicar em “Votar” irá ser redirecionado para o seu boletim de voto eletrónico, a partir desse
                    momentoserão disponibilizados 5 minutos para submeter o seu voto. </p>
                <label>
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <input style={{padding: "10px"}} type="checkbox" id="dataConfirmation" name="dataConfirmation" onChange={() => setConfirmed(!confirmed)}/>
                    <p> Compreendo </p>
                    </div>
                </label>
            </StyledContainer>
            <div className={"button-wrapper"}>
                <button
                    className="vote-button"
                    onClick={() => navigate("/ballot", {
                        state: {
                            electionId: location.state.selectedElectionId,
                            electionName: location.state.selectedElectionName
                        }
                    })}
                >
                    Votar
                </button>

            </div>
        </MainLayout>

</>
)
    ;
};

export default ConfirmElectionPage;