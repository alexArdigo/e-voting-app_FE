import "./Header.css";

import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "../services/UserContext.jsx";
import React from 'react';


export const Header = () => {

    const navigate = useNavigate();

    const {user, logout} = useUserContext();

    const getLogoRoute = () => {
        if (!user) {
            return "/";
        }

        switch (user.role) {
            case "ADMIN":
                return "/admin";
            case "VIEWER":
                return "/viewer";
            default:
                return "/";
        }
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate(getLogoRoute());
    };

    return (
        <>
            <header className="the-header" style={{height: "66px"}}>
                <div className="dflx aic jcsa g20" style={{
                    position: "relative",
                    zIndex: 10,
                    height: "66px",
                    backgroundColor: "var(--white-eleGov)"
                }}>
                    <p style={{textAlign: "center"}}>REPÚBLICA <br/> PORTUGUESA</p>
                    <a href="https://www.portugal.gov.pt/pt/gc25" target="_blank" rel="noreferrer">
                        <img src="/images/Governo_de_Portugal_logo_grey.png" style={{height: "30px"}}
                             alt="Logo do Governo de Portugal"/>
                    </a>
                    <a href="https://www.sg.mai.gov.pt/Paginas/default.aspx" target="_blank" rel="noreferrer">
                        <img src="/images/SGMAI_secretaria_geral.png" style={{height: "30px"}} alt="Logo2"/>
                    </a>
                    <p style={{textAlign: "center"}}>SITE OFICIAL<br/>VOTO E ESTATÍSTICAS</p>
                </div>
            </header>
            <div className="nav-bar aic jcsa noto-sans-regular">
                <Link to={"#"} onClick={handleLogoClick} className={"dInFlex aic g10"}
                      style={{color: "white", height: "40px", textDecoration: "none", cursor: "pointer"}}>
                    <img src="/images/logoEuVoto.png" alt="" style={{height: "inherit"}}/>
                    <h1>EuVoto</h1>
                </Link>
                <ul>
                    <li onClick={() => navigate("/contact")}>Contacto</li>
                    <li onClick={() => navigate("/help")}>Ajuda</li>
                    <li><Link to="/faq">FAQ</Link></li>
                    {user?.username ? (
                        <>
                            <li>
                                <Link to={user.role === "ADMIN" ? "/admin" : "/viewer"}>
                                    <p style={{display: "inline", margin: 0, fontWeight: "bold"}}>{user.username}</p>
                                </Link>
                            </li>
                            <button className="header-button" type="submit" onClick={logout}>Logout</button>
                        </>
                    ) : null}
                </ul>
            </div>
        </>
    );
};

export default Header;