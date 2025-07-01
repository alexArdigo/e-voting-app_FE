import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../services/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../services/api";

const VoterData = () => {

    const { user, setUser } = useUserContext();
    const [confirmed, setConfirmed] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        if (!confirmed) {
            toast("Por favor, confirme que os dados estão corretos.");
            return;
        }
        navigate("/passos");
    }

    const handleInfo = async () => {
        try {
            const {data} = await api.get("/voters/info");
            setUser(data);
        } catch (e) {
            console.error("Erro ao obter informações:", e);
            toast("Erro ao obter informações do utilizador.");
        }
    }

    useEffect(() => {
        handleInfo();
    }, []);

    return (
        <section className={"voter-data-container"}>

            <div className={"voter-info"}>
                <div className="info-column">
                    <p><strong>Nome:</strong> {user ? `${user.firstName} ${user.lastName}` : "N/A"}</p>
                    <p><strong>Contacto telefónico:</strong> {user?.telephoneNumber}</p>
                    <p><strong>NIF:</strong> {user?.nif}</p>
                    <p><strong>Distrito:</strong> {user?.district}</p>
                </div>

                <div className="info-column">
                    <p><strong>Concelho:</strong> {user?.municipality}</p>
                    <p><strong>Freguesia:</strong> {user?.parish}</p>
                    <p><strong>Elegível:</strong> {user?.eligible ? "Sim" : "Não"}</p>
                    <p><strong>Verificado:</strong> {user?.verified ? "Sim" : "Não"}</p>
                </div>
                <div className="confirmation">
                    <label>
                        <input type="checkbox" id="dataConfirmation" name="dataConfirmation" onChange={() => setConfirmed(!confirmed)}/>
                        Verifico que os dados acima registados estão corretos
                    </label>
                    <button className="vote-button" onClick={handleClick}>Prosseguir</button>
                </div>
            </div>
        </section>
    );
};

export default VoterData;