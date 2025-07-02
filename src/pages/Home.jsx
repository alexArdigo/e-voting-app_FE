import {useNavigate} from "react-router-dom";
import React from "react";

const Home = () => {

    const navigate = useNavigate();

    return (
        <main className="home-container">
            <div className="overlay">
                <img src="/images/rep_portuguesa_white.png" alt="Logo República Portuguesa" className="home-logo" />
                <button className="home-button" onClick={() => navigate("/instructions")}>EU VOTO</button>
            </div>

            <div className={"corner"}>
                <h5>Não és um eleitor?</h5>
                <div className={"login-button-wrapper"}>
                    <button className="login-button" onClick={() => navigate("/login")}>Login</button>
                </div>

            </div>

        </main>
    );
};

export default Home;