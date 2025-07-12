import api from "../../services/api";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import './css/viewer.css';
import MainLayout from "../../layouts/MainLayout";
import {toast} from "react-toastify";


const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [institutionName, setInstitutionName] = useState("");


    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        const body = new FormData();
            body.set ("username", username);
            body.set ("password", password);
            body.set ("name", name);
            body.set ("institutionName", institutionName);

        try {
            const response = await api.post("/registerViewer", body);

            const user = response.data;

            toast.success("Utilizador registado com sucesso! Aguarde aprovação.");

            navigate("/login");

        } catch (e) {
            if (e.response?.data?.includes("exists")) {
                toast.error("Nome de utilizador já existe.");
            } else {
                toast.error("Erro ao registar utilizador.");
                console.error(e);
            }
        }
    }

    return (
        <div className="viewer">
            <MainLayout style={{minHeight: "100vh"}}>
                <div className="user-info-container">
                    <img src="/images/legislativas-viewer.png" alt="Register" className="register-image"/>
                    <h3>Formulário de Registo</h3>

                    <form onSubmit={handleSubmit}>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Nome de utilizador"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Palavra-passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            id="institutionName"
                            type="text"
                            name="institutionName"
                            placeholder="Instituição"
                            value={institutionName}
                            onChange={(e) => setInstitutionName(e.target.value)}
                        />

                        <button type="submit">Registar</button>
                    </form>
                </div>
            </MainLayout>
        </div>
    );
}
export default Register;
