import React, {useState} from 'react';
import {useNavigate, useLocation, Navigate} from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import {toast} from "react-toastify";
import {useUserContext} from "../../services/UserContext";


const ConfirmElectionPage = () => {
    const navigate = useNavigate();
    const {user} = useUserContext();
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
            const response = await voterHasVotedThisElection(selectedElectionId, user.id);
            if (response.data.hasVoted) {
                toast.error("Você já votou nesta eleição.");
                return <Navigate to="/election" replace />;
            }
        } catch (error) {
            console.error("Erro ao verificar se já votou:", error);
        }
        return navigate("/ballot", {
            state: {
                electionId: selectedElectionId,
                electionName: selectedElectionName
            }
        });
    };

    return (
        <MainLayout>
            <div className="confirm-page-container">
                <p>Você selecionou a eleição:</p>
                <h1 className="confirm-election-name">
                    {selectedElectionName || "Nome da eleição não disponível"}
                </h1>

                <div className="confirm-warning-box">
                    <p><strong>Atenção!</strong> Ao clicar em "Votar", será redirecionado para o seu boletim de voto. Terá <strong>5 minutos</strong> para submeter o seu voto.</p>
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