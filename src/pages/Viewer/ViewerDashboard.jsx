import React from "react";
import {Outlet} from "react-router-dom";
import ViewerSideBar from "../../components/specific/ViewerSideBar";
import "./css/Viewer.css"

const ViewerDashboard = () => {

    return (
        <main className="viewer-dashboard-container">
            <ViewerSideBar />

            <section className="viewer-dashboard-content">
                <Outlet />
            </section>
        </main>
    );
};

export default ViewerDashboard;