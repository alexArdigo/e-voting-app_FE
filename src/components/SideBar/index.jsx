import React, {useState} from 'react';
import {useUserContext} from "../../services/UserContext";

const SideBar = () => {
    const {user} = useUserContext();
    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
        <div className="sidebar-container" style={{
            width: sidebarOpen ? "25vw" : "0",
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

                        <img src="/images/Icon%20Viewer.jpg" height="100px" alt="Profile"/>

                        <div className="side-profile">
                            <p><strong>Nome:</strong> {user?.name || "N/A"}</p>
                            <p><strong>Instituição:</strong> {user?.institutionName || "N/A"}</p>
                            <p><strong>Email:</strong> {user?.username || "N/A"}</p>
                        </div>

                        <button className="edit">Editar Perfil</button>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default SideBar;