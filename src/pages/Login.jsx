import React, {useState} from 'react';
import {useUserContext} from "../services/UserContext";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import './Viewer/css/Viewer.css';
import MainLayout from "../layouts/MainLayout";
import {toast} from "react-toastify";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {setUser} = useUserContext();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const body = new FormData();
        body.set("username", username);
        body.set("password", password);

        try {
            await api.post("/login", body);
            const response = await api.get("/loggedUser");
            setUser(response.data);
            navigate(response.data.role === "VIEWER" ? "/viewer" : "/admin")
        } catch (e) {
            console.error("Erro ao fazer login:", e);
            toast.error("Credenciais inválidas ou erro no servidor.");
        }
    }

    return (

        <div className="viewer">
            <MainLayout style={{minHeight: "100vh"}}>
                <div className="user-info-container">
                    <h3>ACESSO AO PORTAL DE UTILIZADOR</h3>

                    <form onSubmit={handleSubmit}>
                        <input type="text"
                               id="username"
                               value={username}
                               onChange={(e) => {
                                   setUsername(e.target.value);
                               }}
                               placeholder="Nome de utilizador"
                        />
                        <input type="password"
                               id="password"
                               value={password}
                               onChange={(e) => {
                                   setPassword(e.target.value);
                               }}
                               placeholder="Palavra-passe"
                        />
                        <button type="submit">Entrar</button>
                        <br/>
                        <img src="/images/legislativas-viewer.png" alt="Login" className="login-image"/>
                        <p>Não tem conta? Registe-se <a style={{color: "white"}} href="/register"><strong>aqui.</strong></a>
                        </p>
                    </form>
                </div>
            </MainLayout>
        </div>
    );

};

export default Login;


