import React, {useEffect, useState} from "react";
import {NavLink, Outlet} from "react-router-dom";
import "../Admin.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import api from "../../../services/api";
import SideBar from "../../../components/specific/SideBar";
import AdminSideBar from "./AdminSideBar";
import Admin from "../Admin";

const AdminDashboard = ({children, pendingUsers}) => {
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
        <main className="admin-dashboard-container">
            <AdminSideBar hasPendingViewer={hasPendingViewer} />

            <section className="admin-dashboard-content">
                <Outlet />
            </section>
        </main>
    );
};

export default AdminDashboard;