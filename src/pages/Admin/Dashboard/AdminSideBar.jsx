import React from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";

const AdminSideBar = ({hasPendingViewer}) => {

    return (
        <nav className="admin-sidebar">
            <div className="admin-sidebar-sticky">
                <h3>Painel de Administração</h3>
                <ul className="admin-nav-list">
                    <li>
                        <NavLink
                            to="/admin"
                            end
                            className={({isActive}) =>
                                isActive ? "admin-nav-link active" : "admin-nav-link"
                            }
                        >
                            Gerir Eleições
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/admin/create-election"
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
    );
};

export default AdminSideBar;