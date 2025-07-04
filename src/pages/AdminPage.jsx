import React, { useEffect, useState } from 'react';
import AdminDashboard from "../components/specific/AdminDashboard";
import { getActiveElections } from "../services/ElectionService";

const AdminPage = () => {
    const [activeElection, setActiveElection] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const active = await getActiveElections();
                setActiveElection(Array.isArray(active) ? active[0] : active);
            } catch (error) {
                console.error("Erro ao buscar eleição ativa:", error);
            }
        })();
    }, []);

    console.log(activeElection)

    return (
        <div>
            <h1>Admin Page</h1>
            <AdminDashboard/>
            <h2>Bem-vindo à página de administração. Aqui você pode gerenciar as eleições e visualizar autorizações pendentes.</h2>

            <div className="steps-container">
                <p><strong>Eleição Ativa</strong></p>
                <div className="step">
                    {activeElection ? (
                        <>
                            <p><strong>Nome:</strong> {activeElection.name}</p>
                            <p><strong>Tipo:</strong> {activeElection.electionType === "PRESIDENTIAL" ? "Presidencial" : "Círculo Eleitoral"}</p>
                            <p><strong>Total de votos:</strong> {activeElection.totalVotes ?? "N/A"}</p>
                            <p><strong>Partidos:</strong> {(activeElection.parties || []).map(p => p.name).join(", ") || "Nenhum"}</p>

                            {activeElection.electionType === "CIRCULO_ELEITORAL" && (
                                <>
                                    <p><strong>Distrito:</strong> {activeElection.districtName ?? "N/A"}</p>
                                    <p><strong>Município:</strong> {activeElection.municipalityName ?? "N/A"}</p>
                                    <p><strong>Freguesia:</strong> {activeElection.parishName ?? "N/A"}</p>
                                    <p><strong>Nº de Mandatos:</strong> {activeElection.seats ?? "N/A"}</p>
                                </>
                            )}
                        </>
                    ) : (
                        <p>Nenhuma eleição ativa encontrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;