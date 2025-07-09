import React from "react";
import { NavLink } from "react-router-dom";
import "./Admin.css";

const AdminDashboard = ({ children }) => {
    return (
        <div className="admin-dashboard-container">
            <nav className="admin-sidebar">
                <h3>Painel de Administração</h3>
                <ul className="admin-nav-list">
                    <li>
                        <NavLink
                            to="/admin"
                            end={true}
                            className={({ isActive }) =>
                                isActive ? "admin-nav-link active" : "admin-nav-link"
                            }
                        >
                            Gerenciar Eleições
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/create-election"
                            className={({ isActive }) =>
                                isActive ? "admin-nav-link active" : "admin-nav-link"
                            }
                        >
                            + Criar Nova Eleição
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/viewers"
                            className={({ isActive }) =>
                                isActive ? "admin-nav-link active" : "admin-nav-link"
                            }
                        >
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