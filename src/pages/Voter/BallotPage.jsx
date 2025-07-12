import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainLayout from '../../layouts/MainLayout.jsx';
import StyledContainer from '../../layouts/StyledContainer.jsx';
import Timer from '../../components/specific/Timer.jsx';
import BallotForm from '../../components/specific/Ballot/BallotForm.jsx';
import { getBallotByElectionId, castVote } from '../../services/ElectionService.jsx';
import { useUserContext } from '../../services/UserContext.jsx';
import '../../components/specific/Ballot/Ballot.css';

const BallotPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const electionId = location.state?.electionId
    const electionName = location.state?.electionName

    console.log('Election ID:', electionId);
    console.log('Election Name:', electionName);

    const { user, isVoting, setIsVoting, logout } = useUserContext();

    const [parties, setParties] = useState([]);
    const [selectedParty, setSelectedParty] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        if (!electionId) {
            toast.error('Eleição não selecionada. Redirecionando...');
            navigate('/election', { replace: true });
            return;
        }

        if (!user?.id) {
            toast.error('Utilizador não autenticado. Redirecionando...');
            navigate('/auth', { replace: true });
            return;
        }

        fetchBallotData();
    }, [electionId, user?.id, navigate]);

    const fetchBallotData = async () => {
        try {
            setLoading(true);
            setError(null);

            const ballotData = await getBallotByElectionId(electionId);

            if (!ballotData || ballotData.length === 0) {
                throw new Error('Nenhuma opção de voto disponível para esta eleição');
            }

            setIsVoting(true);
            const partiesData = ballotData.map(org => ({
                id: org.id,
                name: org.name,
                fullName: org.organisationName || org.name,
               // acronym: org.name,
                logoUrl: org.logoUrl || org.imageUrl,
                imageUrl: org.imageUrl || org.logoUrl,
                color: org.color,
                description: org.description,
                candidates: org.candidates || []
            }));

            setParties(partiesData);
            console.log('Opções de voto carregadas:', partiesData);

        } catch (error) {
            console.error('Erro ao carregar opções de voto:', error);
            setError(error.message);

            const fallbackParties = [
                {
                    id: 1,
                    name: 'PS',
                    fullName: 'Partido Socialista',
                    acronym: 'PS',
                    logoUrl: '/images/ps-logo.png',
                    color: '#FF6B9D'
                },
                {
                    id: 2,
                    name: 'IL',
                    fullName: 'Iniciativa Liberal',
                    acronym: 'IL',
                    logoUrl: '/images/il-logo.png',
                    color: '#00D4FF'
                },
                {
                    id: 3,
                    name: 'BE',
                    fullName: 'Bloco de Esquerda',
                    acronym: 'BE',
                    logoUrl: '/images/be-logo.png',
                    color: '#8B5CF6'
                }
            ];

            setParties(fallbackParties);
            toast.warning('Erro ao carregar dados. Usando dados de exemplo.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        let votePartyId = selectedParty;

        if (!votePartyId) {
            const confirmBlank = window.confirm("Confirma que deseja votar em branco?");
            if (!confirmBlank) return;
            votePartyId = -1;
        }
        if (!electionId) {
            toast.error('Election ID not defined.');
            return;
        }
        if (!user?.nif) {
            toast.error("Voter's NIF not available. Login again.");
            return;
        }
        if (submitting) return;

        setSubmitting(true);
        try {
            const voteRequest = {
                organisationId: votePartyId,
                voterNif: user.nif,
                municipalityName: user.municipality?.municipalityName
            };

            console.log('Enviando voto:', voteRequest);

            await castVote(electionId, voteRequest);
            setIsVoting(false)
            toast.success('Voto submetido com sucesso!');

          //  localStorage.removeItem("electionId");
          //  localStorage.removeItem("electionName");

            navigate('/submitted', {
                state: {
                    electionId: electionId,
                    electionName: electionName || 'Eleição',
                    partyName: parties.find(p => p.id === selectedParty)?.name || 'Partido selecionado'
                }
            });

        } catch (error) {
            console.error('Erro ao submeter voto:', error);

            if (error.response?.status === 400) {
                toast.error('Voto inválido. Verifique os dados e tente novamente.');
            } else if (error.response?.status === 403) {
                toast.error('Não tem permissão para votar nesta eleição.');
            } else if (error.response?.status === 409) {
                toast.error('Já votou nesta eleição.');
            } else {
                toast.error('Erro ao submeter voto. Tente novamente.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleTimeExpired = () => {
        toast.error('Tempo esgotado! Será redirecionado...');
        setIsVoting(false);
        logout();
        setTimeout(() => navigate('/'), 3000);
    };

    if (loading) {
        return (
            <MainLayout className="dflxColumn">
                <StyledContainer>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <p>A carregar opções de voto...</p>
                        <div style={{ marginTop: '20px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                border: '4px solid #f3f3f3',
                                borderTop: '4px solid #3C5DBC',
                                borderRadius: '50%',
                                margin: '0 auto'
                            }} />
                        </div>
                    </div>
                </StyledContainer>
            </MainLayout>
        );
    }

    if (error && parties.length === 0) {
        return (
            <MainLayout className="dflxColumn">
                <StyledContainer>
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                        <h2>Erro ao carregar eleição</h2>
                        <p>{error}</p>
                        <button
                            className="vote-button"
                            onClick={() => navigate('/election')}
                            style={{ marginTop: '20px' }}
                        >
                            Voltar à seleção de eleições
                        </button>
                    </div>
                </StyledContainer>
            </MainLayout>
        );
    }

    return (
        <MainLayout className="dflxColumn">
            <Timer
                parties={parties}
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                onTimeExpired={handleTimeExpired}
            />

            <StyledContainer variant="yellow" style={{ marginTop: '20px', textAlign: 'center' }}>
                <h1>{electionName || 'Eleição'}</h1>
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
                //disabled={submitting || !selectedParty}
                style={{ marginTop: '30px' }}
            >
                {submitting ? 'A submeter...' : 'Submeter Voto'}
            </button>

            <StyledContainer style={{ width: '500px', marginTop: '20px' }}>
                <div style={{ textAlign: 'center', color: '#6b7280' }}>
                    <p>
                        <em>Selecione uma opção e clique em "Submeter Voto" para confirmar.</em>
                    </p>
                    <p>
                        <em>
                            Tempo restante: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </em>
                    </p>
                    {selectedParty && (
                        <p style={{ color: '#059669', fontWeight: 'bold' }}>
                            ✓ Opção selecionada: {parties.find(p => p.id === selectedParty)?.name}
                        </p>
                    )}
                </div>
            </StyledContainer>
        </MainLayout>
    );
};

export default BallotPage;