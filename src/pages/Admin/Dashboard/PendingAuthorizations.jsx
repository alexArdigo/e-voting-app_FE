import React, { useEffect, useState } from 'react';
import AdminDashboard from "./AdminDashboard";
import StyledContainer from "../../../layouts/StyledContainer";
import api from "../../../services/api";
import { useUserContext } from "../../../services/UserContext";

const PendingAuthorizations = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const { user } = useUserContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermApproved, setSearchTermApproved] = useState("");

    const filteredPending = pendingUsers.filter(user =>
        user.username.toLowerCase().includes(searchTermApproved.toLowerCase())
    );

    const filteredApproved = approvedUsers.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchData = async () => {
        try {
            const response = await api.get("/pendingAuthorization");
            setPendingUsers(response.data || []);
        } catch (e) {
            console.error("Erro ao buscar utilizadores pendentes", e);
        }
    };

    const fetchApproved = async () => {
        try {
            const responseAp = await api.get("/approvedViewers");
            setApprovedUsers(responseAp.data || []);
        } catch (e) {
            console.error("Erro ao buscar utilizadores aprovados", e);
        }
    };

    const handleApprove = async (id) => {

            try {
                await api.post(`/approveViewer?id=${id}`);
                await fetchData();
            } catch (error) {
                console.error("Erro ao aprovar utilizador:", error);
            }
    };

    const handleRemove = async (id) => {

        try {
            await api.post(`/approveViewer?id=${id}`);
            await fetchData();
        } catch (error) {
            console.error("Erro ao aprovar utilizador:", error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchApproved();
        handleApprove();
        handleRemove();

    }, []);

    return (
        <AdminDashboard>
            <div className="admin-container">
            <h1>Lista de Utilizadores a Aguardar Aprovação</h1>
            <p>Aprove o utilizador no sistema</p>
            </div>
            <div className="dflx">
            <StyledContainer style={{width: "100%", marginRight: "50px"}}>
                <h1>Pendentes de Aprovação</h1>
                <p>Lista de utilizadores pendentes de aprovação:</p>

                <input
                    type="text"
                    placeholder="Pesquisar utilizador..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ marginBottom: "10px", width: "100%" }}
                />

                <ul className="pending-users-ul">
                    {filteredPending.map((user) => (
                        <li className="li-pending" key={user.id}>
                            {user.username}
                            <button className="button-pending-list" onClick={() => handleApprove(user.id)}> Aprovar </button>
                        </li>
                    ))}
                </ul>
            </StyledContainer>
                <StyledContainer style={{width: "100%"}}>
                    <h1>Remover utilizador</h1>
                    <p>Lista de utilizadores aprovados:</p>
                    <input
                        type="text"
                        placeholder="Pesquisar utilizador..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ marginBottom: "10px", width: "100%" }}
                    />
                    <ul className="pending-users-ul">
                        {filteredApproved.map((user) => (
                            <li className="li-pending" key={user.id}>
                                {user.username}
                                <button className="button-pending-list-remove" onClick={() => handleApprove(user.id)}> Remover </button>
                            </li>
                        ))}
                    </ul>
                </StyledContainer>
            </div>
        </AdminDashboard>
    );
};

export default PendingAuthorizations;
