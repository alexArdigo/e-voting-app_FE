import {useNavigate} from "react-router-dom";
import React from "react";
import {useUserContext} from "../../services/UserContext";
import '../Viewer/css/Viewer.css';

const Home = () => {
    const {user} = useUserContext();
    const navigate = useNavigate();

    return (
        <main className="home-container">
            <div className="overlay">
                <img
                    src="/images/rep_portuguesa_white.png"
                    alt="Logo República Portuguesa"
                    className="home-logo"
                />
                <button
                    className="home-button"
                    style={{marginBlock:"-30px"}}
                    onClick={() => {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        navigate("/instructions");
                    }}
                >EU VOTO
                </button>
            </div>

            {user?.id ? "" : <div className={"login-button-wrapper"}>
                <h5>Não é eleitor?</h5>
                <button
                    className="header-button"
                    onClick={() => {
                        window.scrollTo({top: 0, behavior: 'smooth'});
                        navigate("/login");
                    }}
                >Entrar
                </button>
            </div>}

        </main>
    );
};

export default Home;