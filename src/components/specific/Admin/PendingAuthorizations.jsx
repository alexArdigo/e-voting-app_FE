import React, { useEffect, useState } from 'react';
import AdminDashboard from "./AdminDashboard";
import StyledContainer from "../../../layouts/StyledContainer";
import api from "../../../services/api";
import { useUserContext } from "../../../services/UserContext";

const PendingAuthorizations = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const { user } = useUserContext();

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

    useEffect(() => {
        fetchData();
        fetchApproved();
    }, []);

    return (
        <AdminDashboard>
            <StyledContainer>
                <h1>Pendentes de Aprovação</h1>
                <p>Lista de utilizadores pendentes de aprovação:</p>
                <ul>
                    {pendingUsers.map((user) => (
                        <li key={user.id}>
                            {user.username}
                            <button onClick={() => handleApprove(user.id)}> Aprovar </button>
                        </li>
                    ))}
                </ul>
                <h1>Aprovados</h1>
                <p>Lista de utilizadores aprovados:</p>
                <ul>
                    {approvedUsers.map((user) => (
                        <li key={user.id}>
                            {user.username}
                        </li>
                    ))}
                </ul>
            </StyledContainer>
        </AdminDashboard>
    );
};

export default PendingAuthorizations;
