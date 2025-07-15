import React, {useState} from 'react';
import {useNavigate, useLocation, Navigate} from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import {toast} from "react-toastify";
import {useUserContext} from "../../services/UserContext";
import "../Voter/css/Confirm.css";
import {voterHasVotedThisElection} from "../../services/ElectionService";

const ConfirmElectionPage = () => {
    const navigate = useNavigate();
    const {user, isVoting} = useUserContext();
    const location = useLocation();
    const selectedElectionName = location.state?.selectedElectionName;
    const selectedElectionId = location.state?.selectedElectionId;
    const [confirmed, setConfirmed] = useState(false);

    const handleStartVoting = async () => {
        if (!confirmed) {
            toast.warn("Por favor, confirme que compreende as condições para votar.");
            return;
        }

        try {

            if (!isVoting) {
                const response = await voterHasVotedThisElection(selectedElectionId, user.id);

                if (response.hasVoted) {
                    toast.error("Você já votou nesta eleição.");
                    return navigate("/election", {replace: true});
                }
            }

            return navigate("/ballot", {
                state: {
                    electionId: selectedElectionId,
                    electionName: selectedElectionName
                }
            });
        } catch (error) {
            console.error("Error in checking if user already voted:", error);
        }

    };

    return (
        <MainLayout>
            <div className="confirm-page-container" style={{minHeight: "70vh"}}>
                <p>Você selecionou a eleição:</p>
                <h1 className="confirm-election-name">
                    {selectedElectionName || "Nome da eleição não disponível"}
                </h1>

                <div className="confirm-warning-box">
                    <p>
                        <strong>Atenção!</strong> Ao clicar em "Votar", será redirecionado para o seu boletim de voto.
                        Após essa página, não poderá terminar a sua sessão e terá <strong>5 minutos</strong> para submeter o seu voto.
                        Caso não o faça, o seu voto será considerado nulo/branco.
                    </p>
                </div>

                <label className="confirm-checkbox-label">
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={() => setConfirmed(!confirmed)}
                    />
                    <span>Compreendo e desejo prosseguir.</span>
                </label>

                <button
                    className="vote-button"
                    onClick={handleStartVoting}
                    disabled={!confirmed}
                >
                    Votar
                </button>
            </div>
        </MainLayout>
    );
};

export default ConfirmElectionPage;