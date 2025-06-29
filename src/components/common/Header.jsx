import "../../css/Header.css"

import {Link} from "react-router-dom";

export const Header = () => {

    return (
        <header>
            <div className="logo-bar">
                <p>REPUBLICA PORTUGUESA</p>
                <Link to={"/"}><img src="../../../public/images/Governo_de_Portugal_logo_grey.png" alt="Logo" height="50" /></Link>
                <p>SITE OFFICIAL VOTO ESTATISTICAS <br/>GOVERNO REPUPLICA PORTUGUES</p>
            </div>
            <div className="nav-bar">
                <ul>
                    <li>Contacto</li>
                    <li>Ajuda</li>
                    <li><Link to="/faq">FAQ</Link></li>
                    {/*<li>*/}
                    {/*    <button>Login</button>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </header>
    );
};

export default Header;