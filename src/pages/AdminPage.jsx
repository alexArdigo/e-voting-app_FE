import React from 'react';
import AdminDashboard from "../components/specific/AdminDashboard";

const AdminPage = () => {
    let election;
    return (
        <div>
            <h1>Admin Page</h1>
            <AdminDashboard/>
            <h2>Bem-vindo à página de administração. Aqui você pode gerenciar as eleições e visualizar autorizações pendentes.</h2>
            <div className="steps-container">
                <p>Eleição Ativa</p>
                <div className="step">
                    <p>Eleição: </p>
                    <p>Total de votos: </p>
                    <p>Partidos:</p>
                </div>
            </div>

        </div>
    );
};

export default AdminPage;