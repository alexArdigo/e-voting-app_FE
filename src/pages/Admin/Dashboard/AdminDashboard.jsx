import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import "../Admin.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import api from "../../../services/api";

const AdminDashboard = ({children, pendingUsers}) => {
    console.log("pendingUsers", pendingUsers);
    const [hasPendingViewer, setHasPendingViewer] = useState(pendingUsers?.length || []);

    const fetchPendingViewers = async () => {
        try {
            const response = await api.get("/pendingAuthorization")
            setHasPendingViewer(response.data)
        } catch (e) {
            console.error("Error fetching pending viewer requests", e);
        }
    }

    useEffect(() => {
        fetchPendingViewers();
    }, [pendingUsers]);

    return (
        <div className="admin-dashboard-container">
            <nav className="admin-sidebar">
                <div className="admin-sidebar-sticky">
                    <h3>Painel de Administração</h3>
                    <ul className="admin-nav-list">
                        <li>
                            <NavLink
                                to="/admin"
                                end={true}
                                className={({isActive}) =>
                                    isActive ? "admin-nav-link active" : "admin-nav-link"
                                }
                            >
                                Gerir Eleições
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/create-election"
                                className={({isActive}) =>
                                    isActive ? "admin-nav-link active" : "admin-nav-link"
                                }
                            >
                                + Criar Nova Eleição
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/admin/viewers"
                                className={({isActive}) =>
                                    isActive ? "admin-nav-link active" : "admin-nav-link"
                                }
                            >
                                Autorizações Pendentes
                                {hasPendingViewer.length ? <FontAwesomeIcon
                                    icon={faBell}
                                    style={{
                                        color: "#e8d163",
                                        height: 20,
                                        marginLeft: 10,
                                    }}
                                /> : ""
                                }
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                to="/admin/edit/parties"
                                className={({isActive}) =>
                                    isActive ? "admin-nav-link active" : "admin-nav-link"
                                }
                            >
                                Editar Partidos
                            </NavLink>
                        </li>
                    </ul>
                </div>
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