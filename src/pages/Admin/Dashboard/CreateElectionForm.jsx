import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import {createElection, uploadCSVFile} from "../../../services/ElectionService";
import { toast } from "react-toastify";
import "../Admin.css";
import UploadCSV from "../../../components/UploadCSV";

const CreateElectionPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        electionType: "PRESIDENTIAL"
    });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.startDate) {
            toast.error("Por favor, preencha o nome e a data de início.");
            return;
        }

        if (formData.electionType === "PRESIDENTIAL") {
            if (!formData.endDate) {
                toast.error("Para eleições presidenciais, a data de fim é obrigatória.");
                return;
            }
            if (new Date(formData.endDate) <= new Date(formData.startDate)) {
                toast.error("A data de fim deve ser posterior à data de início.");
                return;
            }
        }

        try {
            setLoading(true);
            const response = await createElection(formData);
            let csvResponse;
            console.log(file);
            if (response.status === 200) {
                try {
                    const body = new FormData();
                    body.set("electionId", response.data.id);
                    body.set("file", file);
                    csvResponse = await uploadCSVFile(body);
                    console.log('CSV upload response:', csvResponse);
                } catch (csvError) {
                    console.error('Erro ao fazer upload do arquivo CSV:', csvError);
                }
            }

            if (response.status === 200 && csvResponse?.status === 200) {
                toast.success(`Eleição "${response.data.name}" criada com sucesso!`);

                if (formData.electionType === "LEGISLATIVE") {
                    toast.info("Eleição legislativa criada com círculos eleitorais para todos os distritos");
                }

                setFormData({
                    name: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    electionType: "PRESIDENTIAL"
                });

                setTimeout(() => {
                    navigate("/admin");
                }, 2000);
            } else {
                toast.error("Erro: Resposta inválida do servidor");
            }
        } catch (error) {
            console.error('Erro ao criar eleição:', error);
            const errorMessage = error.response?.data || error.message || "Erro ao criar eleição. Tente novamente.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <AdminDashboard>
            <div className="admin-container">
                <h1>Criar Nova Eleição</h1>
                <p>Preencha os dados para criar uma nova eleição no sistema.</p>

                <form onSubmit={handleSubmit}>
                    <div className="election-card">
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
                                placeholder="Descrição da eleição..."
                                rows="4"
                                maxLength={500}
                            />
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
                            {formData.electionType === "LEGISLATIVE" && (
                                <small className="form-help">
                                    Será criada automaticamente com círculos eleitorais para todos os distritos
                                </small>
                            )}
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

                            {formData.electionType === "PRESIDENTIAL" && (
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
                            )}
                        </div>
                        <UploadCSV
                            file={file}
                            setFile={setFile}
                            formData={formData}
                        />
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