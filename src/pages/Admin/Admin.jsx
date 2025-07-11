import React, { useEffect, useState } from "react";
import AdminDashboard from "./Dashboard/AdminDashboard";
import {
    getActivePresidentialElections,
    getActiveLegislativeElections,
    getPresidentialElections,
    getLegislativeElections
} from "../../services/ElectionService";
import { toast } from "react-toastify";
import ElectionCard from "./Dashboard/ElectionCard";
import "./Admin.css";
import EditElection from "./Dashboard/EditElection";

const Admin = () => {
    const [activeElections, setActiveElections] = useState([]);
    const [notActiveElections, setNotActiveElections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingElection, setEditingElection] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);

    useEffect(() => {
        loadElections();
    }, []);

    const loadElections = async () => {
        try {
            setLoading(true);

            const [activePresidential, activeLegislative] = await Promise.all([
                getActivePresidentialElections(),
                getActiveLegislativeElections()
            ]);

            const [notActivePresidential, notActiveLegislative] = await Promise.all([
                getPresidentialElections(null, false),
                getLegislativeElections(null, false)
            ]);

            const processedActiveLegislative = activeLegislative.map(election => ({
                ...election,
                electionType: "LEGISLATIVE"
            }));

            const processedNotActiveLegislative = notActiveLegislative.map(election => ({
                ...election,
                electionType: "LEGISLATIVE"
            }));

            const activeElectionsData = [
                ...(Array.isArray(processedActiveLegislative) ? processedActiveLegislative : [])
            ];

            const notActiveElectionsData = [
                ...(Array.isArray(processedNotActiveLegislative) ? processedNotActiveLegislative : [])
            ];

            setActiveElections(activeElectionsData);
            setNotActiveElections(notActiveElectionsData);

        } catch (error) {
            console.error('Erro ao buscar eleições:', error);
            toast.error("Erro ao buscar eleições");
            setActiveElections([]);
            setNotActiveElections([]);
        } finally {
            setLoading(false);
        }
    };

    const handleEditElection = (election) => {
        setEditingElection(election);
        setIsEditOpen(true);
    };

    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setEditingElection(null);
    };

    const handleUpdateElection = () => {
        loadElections();
    };

    const handleDeleteElection = () => {
        loadElections();
    };

    if (loading) {
        return (
            <div className="admin-container">
                <h1>Página de Administração</h1>
                <p>A carregar os dados...</p>
            </div>
        );
    }

    return (
        <AdminDashboard>
            <div className="admin-container">
                <h1>Página de Administração</h1>
                <p>
                    Bem-vindo à página de administração. Aqui você pode gerenciar as eleições presidenciais e legislativas.
                </p>

                <div className="elections-grid">
                    <div className="elections-section">
                        <h2 className="active-elections-title">
                            Eleições Ativas ({activeElections.length})
                        </h2>

                        {activeElections.length > 0 ? (
                            <div className="election-list">
                                {activeElections.map((election) => (
                                    <ElectionCard
                                        key={`${election.electionType}-${election.id}`}
                                        election={election}
                                        isActive={true}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="no-elections-message">Nenhuma eleição ativa encontrada.</p>
                        )}
                    </div>

                    <div className="elections-section">
                        <h2 className="elections-title">
                            Eleições Não Ativas ({notActiveElections.length})
                        </h2>

                        {notActiveElections.length > 0 ? (
                            <div className="election-list">
                                {notActiveElections.map((election) => (
                                    <ElectionCard
                                        key={`${election.electionType}-${election.id}`}
                                        election={election}
                                        isActive={false}
                                        onEdit={handleEditElection}
                                        onDelete={handleDeleteElection}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="no-elections-message">Nenhuma eleição não ativa encontrada.</p>
                        )}
                    </div>
                </div>

                <EditElection
                    election={editingElection}
                    isOpen={isEditOpen}
                    onClose={handleCloseEdit}
                    onUpdate={handleUpdateElection}
                />
            </div>
        </AdminDashboard>
    );
};

export default Admin;