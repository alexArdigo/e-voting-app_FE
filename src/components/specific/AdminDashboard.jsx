import React from 'react';
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <ul>
            <li><Link to="/admin/election">Eleições</Link></li>
            <li><Link to="/admin/viewers">Autorizações Pendentes</Link></li>
        </ul>
    );
};

export default AdminDashboard;