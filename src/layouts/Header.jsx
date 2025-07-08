import "./Header.css";

import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "../services/UserContext.jsx";
import React from 'react';


export const Header = () => {

    const navigate = useNavigate();

    const {user, logout} = useUserContext();

    return (
        <>
            <header style={{height: "66px"}}>
                <div className="dflx aic jcsa g20">
                    <p style={{textAlign: "center"}}>GOVERNO DA<br/> REPÚBLICA PORTUGUESA</p>
                    <Link to={"/"}><img src="/images/Governo_de_Portugal_logo_grey.png" style={{height: "30px"}}
                                        alt="Logo"/></Link>
                    <Link to={"/"}><img src="/images/SGMAI_secretaria_geral.png" style={{height: "30px"}} alt="Logo2"/></Link>
                    <p style={{textAlign: "center"}}>SITE OFICIAL<br/>VOTO E ESTATÍSTICAS</p>
                </div>
            </header>
            <div className="nav-bar aic jcsa noto-sans-regular">
                <Link to={"/"} className={"dInFlex aic g10"}
                      style={{color: "white", height: "40px", textDecoration: "none"}}>
                    <img src="/public/images/logoEuVoto.png" alt="" style={{height: "inherit"}}/>
                    <h1>EuVoto</h1>
                </Link>
                <ul>
                    <li onClick={() => navigate("/contact")}>Contacto</li>
                    <li onClick={() => navigate("/help")}>Ajuda</li>
                    <li><Link to="/faq">FAQ</Link></li>
                    {user?.username ? (

                        <>
                            <p>{user?.name}</p>
                            <button type="submit" onClick={logout}>Logout</button>
                        </>
                    ) : null}
                    {user?.role === "ADMIN" ? null : null}
                </ul>
            </div>

        </>
    );
};

export default Header;