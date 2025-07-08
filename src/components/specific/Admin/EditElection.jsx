import React, {useState, useEffect} from "react";
import {updateElection} from "../../../services/ElectionService";
import {toast} from "react-toastify";

const EditElection = ({election, isOpen, onClose, onUpdate}) => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        type: "PRESIDENTIAL"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (election) {
            setFormData({
                name: election.name || "",
                description: election.description || "",
                startDate: election.startDate ? new Date(election.startDate).toISOString().slice(0, 16) : "",
                endDate: election.endDate ? new Date(election.endDate).toISOString().slice(0, 16) : "",
                type: election.type || "PRESIDENTIAL"
            });
        }
    }, [election]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.startDate || !formData.endDate) {
            toast.error("Por favor, preencha todos os campos obrigatórios");
            return;
        }

        if (new Date(formData.endDate) <= new Date(formData.startDate)) {
            toast.error("A data de fim deve ser posterior à data de início");
            return;
        }

        try {
            setLoading(true);
            await updateElection(election.id, formData);
            toast.success("Eleição atualizada com sucesso!");
            onUpdate();
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar eleição:', error);
            toast.error("Erro ao atualizar eleição. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="edit-overlay" onClick={onClose}>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                <div className={"edit-content-container"}>
                    <div className="edit-header">
                        <h2>Editar Eleição</h2>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    <div className="edit-content">

                        <div className="election-card">
                            <div className="form-group">
                                <label htmlFor="name">Nome da Eleição *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    maxLength={100}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Descrição</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    maxLength={500}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Tipo de Eleição *</label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="PRESIDENTIAL">Presidencial</option>
                                    <option value="LEGISLATIVE">Legislativa</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="startDate">Data de Início *</label>
                                    <input
                                        type="datetime-local"
                                        id="startDate"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="endDate">Data de Fim *</label>
                                    <input
                                        type="datetime-local"
                                        id="endDate"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="edit-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Atualizando..." : "Atualizar Eleição"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditElection;