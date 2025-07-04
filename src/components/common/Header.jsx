import "../../css/Header.css"

import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "../../services/UserContext.jsx";
import React from 'react';


export const Header = () => {

    const navigate = useNavigate();

    const {user, logout} = useUserContext();

    return (
        <>
            <header>
                <div className="logo-bar">
                    <p>GOVERNO DA REPÚBLICA PORTUGUESA</p>
                    <Link to={"/"}><img src="/images/Governo_de_Portugal_logo_grey.png" alt="Logo"/></Link>
                    <Link to={"/"}><img src="/images/SGMAI_secretaria_geral.png" style={{height: "40px"}} alt="Logo2"/></Link>
                    <p>SITE OFICIAL<br/>VOTO ESTATÍSTICAS</p>
                </div>
            </header>
            <div className="nav-bar">
                <ul>
                    <li onClick={() => navigate("/contact")}>Contacto</li>
                    <li onClick={() => navigate("/help")}>Ajuda</li>
                    <li><Link to="/faq">FAQ</Link></li>
                    {user?.username ? (

                        <>
                            <p>{user?.name}</p>
                            <button type="submit" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <button type="button" onClick={() => navigate("/login")}>Login</button>
                    )}
                </ul>
            </div>

        </>
    );
};

export default Header;