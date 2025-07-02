import React, { useState } from 'react';
import {useUserContext} from "../../services/UserContext";
import {useNavigate} from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/common/Header";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const contexto = useUserContext();

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const body = new FormData();
        body.set("username", username);
        body.set("password", password);

        try {
            const response = await api.post("/login", body);

            const user = response.data;
            contexto.setUser(user);

            navigate("/stats");
        } catch (e) {
            console.error("Erro ao fazer login:", e);
            alert("Credenciais inválidas ou erro no servidor.");
        }
    }

    return (

        <>
            <Header/>
        <div className="user-info-container">
            <h3>Entrar</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} placeholder="Nome de utilizador"/>
                <input type="password" id="password" value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} placeholder="Palavra-passe"/>
                <button type="submit">Login</button>
                <br/>
                <p>Não tem conta? Registe-se <a style={{color: "black"}} href="/register"><strong>aqui.</strong></a></p>
            </form>
        </div>

        </>
    );

}

export default Login;


