import React, {useState} from "react";
import "./viewer.css"
import {useUserContext} from "../../services/UserContext";
import MainLayout from "../../layouts/MainLayout";
import ChartsContainer, {charts} from "./charts/ChartsContainer";
import axios from "axios";
import {toast} from "react-toastify";

const Graph = () => {
    const {user, setUser} = useUserContext();
    const [chartType, setChartType] = useState("votesByParty");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || "");
    const [editedInstitution, setEditedInstitution] = useState(user?.institutionName || "");
    const [editedUsername, setEditedUsername] = useState(user?.username || "");

    const handleSave = async () => {
        try {
            await axios.put("http://localhost:8080/viewer/update-info",
                {
                id: user.id,
                name: editedName,
                institution: editedInstitution,
                username: editedUsername
            },{});

            setUser({
                name: editedName,
                institutionName: editedInstitution,
                username: editedUsername
            });

            setEditing(false);
            toast.success("Perfil atualizado com sucesso!");

        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            toast.error("Erro ao atualizar perfil.");
        }
    };


    return (

            <MainLayout>
                <div className="graph-layout">

                    <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        ☰
                    </div>

                    <div className={`graph-sidebar ${sidebarOpen ? "open" : "closed"}`}>
                        <img src="/images/Icon%20Viewer.jpg" height="100px" alt="Profile" />

                        {editing ? (
                            <div className="side-profile">
                                <label><strong>Nome:</strong>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                </label>
                                <label><strong>Instituição:</strong>
                                    <input
                                        type="text"
                                        value={editedInstitution}
                                        onChange={(e) => setEditedInstitution(e.target.value)}
                                    />
                                </label>
                                <label><strong>Email (Username):</strong>
                                    <input
                                        type="text"
                                        value={editedUsername}
                                        onChange={(e) => setEditedUsername(e.target.value)}
                                    />
                                </label>

                                <button className="save" onClick={handleSave} style={{marginBlock: "15px", marginInline: "5px"}}>Guardar</button>
                                <button className="cancel" onClick={() => setEditing(false)} style={{marginBlock: "15px", marginInline: "5px"}} >Cancelar</button>
                            </div>
                        ) : (

                        <div className="side-profile">
                            <p><strong>Nome:</strong> {user?.name || "N/A"}</p>
                            <p><strong>Instituição:</strong> {user?.institutionName || "N/A"}</p>
                            <p><strong>Email:</strong> {user?.username || "N/A"}</p>
                            <button className="edit" onClick={() => setEditing(true)}>Editar Perfil</button>
                        </div>
                        )}
                    </div>

                    <div className="graph-content">
                        <div className="graph-buttons">
                            {charts.map((chart, index) => (
                                <button
                                    key={index}
                                    onClick={() => setChartType(chart.type)}
                                >
                                    <p className="graph-title">{chart.name}</p>
                                </button>
                            ))}
                        </div>

                        <div className="graph-charts">
                            <ChartsContainer active={chartType} />
                        </div>
                    </div>

                </div>
            </MainLayout>
    );
};

export default Graph;