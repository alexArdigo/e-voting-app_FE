import React from "react";
import { deleteElection } from "../../../services/ElectionService";
import { toast } from "react-toastify";
import "./Admin.css";

const ElectionCard = ({ election, isActive = false, onEdit, onDelete }) => {
    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Tem certeza que deseja apagar a eleição "${election.name}"? Esta ação não pode ser desfeita.`
        );

        if (confirmDelete) {
            try {
                await deleteElection(election.id);
                toast.success("Eleição apagada com sucesso!");
                onDelete();
            } catch (error) {
                console.error('Erro ao apagar eleição:', error);
                toast.error("Erro ao apagar eleição. Tente novamente.");
            }
        }
    };

    const getElectionTypeDisplay = (type) => {
        switch(type) {
            case "PRESIDENTIAL":
                return "Presidencial";
            case "LEGISLATIVE":
                return "Legislativa";
            default:
                return type;
        }
    };

    return (
        <div className="election-card">
            <div className="election-header">
                <h3 className="elections-title">{election.name}</h3>
                {!isActive && (
                    <div className="election-actions">
                        <button
                            className="edit-button"
                            onClick={() => onEdit(election)}
                            title="Editar eleição"
                        >
                            ✏️
                        </button>
                        <button
                            className="delete-button"
                            onClick={handleDelete}
                            title="Apagar eleição"
                        >
                            🗑️
                        </button>
                    </div>
                )}
            </div>

            <div className="election-details">
                <p><strong>Tipo:</strong> {getElectionTypeDisplay(election.electionType || election.type)}</p>

                {election.description && (
                    <p><strong>Descrição:</strong> {election.description}</p>
                )}

                {election.totalVotes !== undefined && (
                    <p><strong>Total de votos:</strong> {election.totalVotes}</p>
                )}

                <p><strong>Início:</strong> {new Date(election.startDate).toLocaleString('pt-PT')}</p>
                <p><strong>Fim:</strong> {
                    election.endDate
                        ? new Date(election.endDate).toLocaleString('pt-PT')
                        : new Date(new Date(election.startDate).getTime() + 8 * 60 * 60 * 1000).toLocaleString('pt-PT')
                }</p>

                {election.organisations?.length > 0 && (
                    <p><strong>Organizações:</strong> {election.organisations.length}</p>
                )}

                {election.parties?.length > 0 && (
                    <p><strong>Partidos:</strong> {election.parties.map(p => p.name).join(", ")}</p>
                )}

                <p><strong>Status:</strong> {election.started ? "Iniciada" : "Não Iniciada"}</p>

            </div>
        </div>
    );
};

export default ElectionCard;