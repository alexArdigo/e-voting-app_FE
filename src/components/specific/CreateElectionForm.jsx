import React, { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { createElection } from "../../services/electionService";
import { toast } from "react-toastify";

const CreateElectionPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        electionType: "PRESIDENTIAL"
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
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
            await createElection(formData);
            toast.success("Eleição criada com sucesso!");

            setFormData({
                name: "",
                description: "",
                startDate: "",
                endDate: "",
                electionType: "PRESIDENTIAL"
            });
        } catch (error) {
            console.error('Erro ao criar eleição:', error);
            toast.error("Erro ao criar eleição. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminDashboard>
            <div className="admin-container">
                <h1>Criar Nova Eleição</h1>
                <p>Preencha os dados para criar uma nova eleição no sistema.</p>

                <form onSubmit={handleSubmit} className="create-election-form">
                    <div className="form-group">
                        <label htmlFor="name">Nome da Eleição *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ex: Eleições Presidenciais 2024"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Descrição da eleição..."
                            rows="4"
                        />
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

                    <div className="form-group">
                        <label htmlFor="electionType">Tipo de Eleição *</label>
                        <select
                            id="electionType"
                            name="electionType"
                            value={formData.electionType}
                            onChange={handleChange}
                            required
                        >
                            <option value="PRESIDENTIAL">Presidencial</option>
                            <option value="LEGISLATIVE">Legislativa</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Criando..." : "Criar Eleição"}
                        </button>
                    </div>
                </form>
            </div>
        </AdminDashboard>
    );
};

export default CreateElectionPage;