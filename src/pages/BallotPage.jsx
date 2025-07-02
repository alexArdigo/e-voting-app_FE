import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainLayout from '../layouts/MainLayout.jsx';
import StyledContainer from '../components/specific/StyledContainer.jsx';
import Timer from '../components/specific/Timer.jsx';
import BallotForm from '../components/specific/BallotForm.jsx';
import api from '../services/api.jsx';
import '../css/Ballot.css';

const BallotPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const electionId = location.state?.electionId;

    const [parties, setParties] = useState([]);
    const [selectedParty, setSelectedParty] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            toast.error('Tempo esgotado! Será redirecionado...');
            setTimeout(() => navigate('/'), 3000);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, navigate]);

    useEffect(() => {
        const fetchParties = async () => {
            if (!electionId) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get(`/elections/${electionId}/ballot`);
                setParties(response.data || []);
            } catch (error) {
                console.error('Error fetching parties:', error);
                toast.error('Erro ao carregar opções de voto');
                setParties([
                    { id: 1, name: 'PS', fullName: 'Partido Socialista' },
                    { id: 2, name: 'IL', fullName: 'Iniciativa Liberal' },
                    { id: 3, name: 'BE', fullName: 'Bloco de Esquerda' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchParties();
    }, [electionId]);

    const handleSubmit = async () => {
        if (!selectedParty) {
            toast.warning('Por favor, selecione uma opção antes de submeter.');
            return;
        }
        if (submitting) return;

        setSubmitting(true);
        try {
            await api.post(`/elections/${electionId}/ballot`, { partyId: selectedParty });
            toast.success('Voto submetido com sucesso!');
            navigate('/submitted', {
                state: {
                    electionName: location.state?.electionName || 'Eleição',
                    partyName: parties.find(p => p.id === selectedParty)?.name
                }
            });
        } catch (error) {
            console.error('Error submitting vote:', error);
            toast.error('Erro ao submeter voto. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <MainLayout className="dflxColumn">
                <StyledContainer>
                    <p>A carregar opções de voto...</p>
                </StyledContainer>
            </MainLayout>
        );
    }

    return (
        <MainLayout className="dflxColumn">
            <Timer timeLeft={timeLeft} />

            <StyledContainer variant="yellow" style={{ marginTop: '20px' }}>
                <h1>{location.state?.electionName || 'Eleição'}</h1>
            </StyledContainer>

            <StyledContainer style={{ width: '500px', padding: '40px' }}>
                <h2>Selecione a sua opção:</h2>
                <BallotForm
                    parties={parties}
                    selectedParty={selectedParty}
                    onPartySelect={setSelectedParty}
                />
            </StyledContainer>

            <button
                className={`vote-button ${submitting ? 'submitting' : ''}`}
                onClick={handleSubmit}
                disabled={submitting || !selectedParty}
                style={{ marginTop: '30px' }}
            >
                {submitting ? 'A submeter...' : 'Submeter'}
            </button>

            <StyledContainer style={{ width: '500px', marginTop: '20px' }}>
                <p><em>Selecione uma opção e clique em "Submeter" para confirmar o seu voto.</em></p>
                <p><em>Tem {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' + timeLeft % 60 : timeLeft % 60} para completar a votação.</em></p>
            </StyledContainer>
        </MainLayout>
    );
};

export default BallotPage;