import React, { useEffect, useState } from 'react';
import AdminDashboard from "../components/specific/AdminDashboard";
import { getActiveElections } from "../services/ElectionService";
import { toast } from "react-toastify";

const AdminPage = () => {
    const [activeElections, setActiveElections] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const active = await getActiveElections();
                setActiveElections(Array.isArray(active) ? active : []);
            } catch (error) {
                toast.error("Erro ao buscar eleições ativas");
            }
        })();
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <AdminDashboard />
            <h2>Bem-vindo à página de administração. Aqui você pode gerenciar as eleições e visualizar autorizações pendentes.</h2>

            <div className="steps-container">
                <p><strong>Eleições Ativas</strong></p>

                {activeElections.length > 0 ? (
                    activeElections.map((election) => (
                        <div className="step" key={election.id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
                            <p><strong>Nome:</strong> {election.name}</p>
                            <p><strong>Tipo:</strong> {election.type === "PRESIDENTIAL" ? "Presidencial" : "Círculo Eleitoral"}</p>
                            <p><strong>Total de votos:</strong> {election.totalVotes ?? "N/A"}</p>
                            <p><strong>Partidos:</strong> {election.parties?.map(p => p.name).join(", ") || "Nenhum"}</p>

                            {election.type === "CIRCULO_ELEITORAL" && (
                                <>
                                    <p><strong>Distrito:</strong> {election.districtName ?? "N/A"}</p>
                                    <p><strong>Município:</strong> {election.municipalityName ?? "N/A"}</p>
                                    <p><strong>Freguesia:</strong> {election.parishName ?? "N/A"}</p>
                                    <p><strong>Nº de Mandatos:</strong> {election.seats ?? "N/A"}</p>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nenhuma eleição ativa encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
