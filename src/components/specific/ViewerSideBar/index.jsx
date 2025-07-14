import React, {useState} from 'react';
import {useUserContext} from "../../../services/UserContext";
import ProfileEditor from "../../ProfileEditor";
import {toast} from "react-toastify";
import axios from "axios";

const ViewerSideBar = () => {
    const {user, setUser} = useUserContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState(user?.name || "");
    const [editedInstitution, setEditedInstitution] = useState(user?.institutionName || "");
    const [editedUsername, setEditedUsername] = useState(user?.username || "");

    const handleSave = async () => {
        try {
            await axios.put("http://localhost:8080/viewer/update-info", {
                id: user.id,
                name: editedName,
                institution: editedInstitution,
                username: editedUsername
            });

            setUser({
                ...user,
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
        <div className="sidebar-container" style={{
            width: sidebarOpen ? "20vw" : "0",
            transition: "width 0.3s, padding 0.3s",
            backgroundColor: "rgb(181, 201, 181)"
        }}>
            <div style={{
                position: "sticky",
                top: "50px",
                zIndex: 1,
            }}>
                <div
                    className="sidebar-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    style={{
                        position: "absolute",
                        top: "10px",
                        zIndex: "1000",

                    }}
                >
                    ☰
                </div>
                <div className={`graph-sidebar ${sidebarOpen ? "open" : "closed"}`}>
                    <div
                        style={{
                            position: "absolute",
                            top: "100px",
                            width: "100%",

                        }}
                        className={"dflxColumn"}
                    >

                        <ProfileEditor
                            currentImage={user?.profilePicture || "https://cdn-icons-png.flaticon.com/512/10109/10109817.png"}
                            onSave={async (newImage) => {
                                try {
                                    const response = await fetch(`http://localhost:8080/${user?.id}/updateProfilePicture`, {
                                        method: "PUT",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ profilePicture: newImage }),
                                    });
                                    if (!response.ok) throw new Error("Erro ao atualizar a imagem");
                                    setUser({ ...user, profilePicture: newImage });
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                        />

                        {editing ? (
                            <div className="side-profile">
                                <label><strong>Nome:</strong>
                                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                </label>
                                <label><strong>Instituição:</strong>
                                    <input type="text" value={editedInstitution} onChange={(e) => setEditedInstitution(e.target.value)} />
                                </label>
                                <label><strong>Email (Username):</strong>
                                    <input type="text" value={editedUsername} onChange={(e) => setEditedUsername(e.target.value)} />
                                </label>
                                <button className="save" onClick={handleSave}>Guardar</button>
                                <button className="cancel" onClick={() => setEditing(false)}>Cancelar</button>
                            </div>
                        ) : (

                        <div className="side-profile">
                            <p><strong>Nome:</strong> {user?.name || "N/A"}</p>
                            <p><strong>Instituição:</strong> {user?.institutionName || "N/A"}</p>
                            <p><strong>Nome de Utilizador:</strong> {user?.username || "N/A"}</p>
                            <p><strong>Último acesso:</strong> {user?.lastLogin || "N/A"}</p>
                            <button className="edit" onClick={() => setEditing(true)} >Editar Perfil</button>
                        </div>
                        )}


                    </div>
                </div>

            </div>

        </div>
    );
};

export default ViewerSideBar;