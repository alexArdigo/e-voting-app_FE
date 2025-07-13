import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import "../Admin.css";
import api from "../../../services/api";
import AdminSideBar from "./AdminSideBar";

const AdminDashboard = () => {
    const [hasPendingViewer, setHasPendingViewer] = useState([]);

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
    }, []);

    return (
        <main className="admin-dashboard-container">
            <AdminSideBar hasPendingViewer={hasPendingViewer} />

            <section className="admin-dashboard-content">
                <Outlet context={setHasPendingViewer} />
            </section>
        </main>
    );
};

export default AdminDashboard;