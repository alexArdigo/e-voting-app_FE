import api from "../../services/api";
import {useNavigate} from "react-router-dom";
import {useState} from "react";


const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        name: "",
        institutionName: ""
    });

    const handleInputs = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }


    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();

        const body = {
            username: inputs.username,
            password: inputs.password,
            name: inputs.name,
            institutionName: inputs.institutionName,
        };

        try {
            await api.post("/registerViewer", body);

            navigate("/stats", {state: {data: inputs}});

        } catch (e) {
            if (e.response?.data?.includes("exists")) {
                alert("Nome de utilizador já existe.");
            } else {
                alert("Erro ao registar utilizador.");
                console.error(e);
            }
        }
    }

    return (
        <>
            <section id="forms">

                <div className="user-info-container">
                    <h2>Formulário de Registo</h2>


                    <form onSubmit={handleSubmit}>

                        <input id="username" type="text" name="username" placeholder="Nome de utilizador" value={inputs.username}
                               onChange={handleInputs}/>
                        <input id="password" type="password" name="password" placeholder="Palavra-passe"
                               value={inputs.password} onChange={handleInputs}/>
                        <input id="name" type="text" name="name" placeholder="Nome Completo" value={inputs.name}
                                 onChange={handleInputs}/>
                        <input id="institutionName" type="text" name="institutionName" placeholder="Instituição"
                                 value={inputs.institutionName} onChange={handleInputs}/>

                        <input id="button" type="submit" value="Registar"></input><br/>

                    </form>

                </div>
            </section>


        </>
    )
}

export default Register;