import React from "react";
import { NavLink } from "react-router-dom";

const AdminDashboard = ({ children }) => {
    return (
        <div className="admin-dashboard-container">
            <nav className="admin-sidebar">
                <h3>Painel de Administração</h3>
                <ul className="admin-nav-list">
                    <li>
                        <NavLink to="/admin/create-election" activeClassName="active-link">
                            + Criar Nova Eleição
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/election" activeClassName="active-link">
                            Gerenciar Eleições
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/viewers" activeClassName="active-link">
                            Autorizações Pendentes
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <main className="admin-dashboard-content">
                {children ? children : (
                    <p>Selecione uma opção no menu à esquerda para começar.</p>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;