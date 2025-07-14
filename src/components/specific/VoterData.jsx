import React, {useEffect, useState} from 'react';
import {useUserContext} from "../../services/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../../services/api";
import HalfLogo from "../common/HalfLogo";

const VoterData = () => {

    const {user, setUser} = useUserContext();
    const [confirmed, setConfirmed] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        if (!confirmed) {
            toast("Por favor, confirme que os dados estão corretos.");
            return;
        }
        navigate("/election");
    };

    return (
        <div className={"dflxColumn"} >
            <h1 style={{margin: 0}}>Dados do Votante</h1>
            <section className={"voter-data-container"}>
                <div className={"voter-info"}>
                    <div className="info-column">
                        <p><strong>Nome:</strong> {user ? `${user?.firstName} ${user?.lastName}` : "N/A"}</p>
                        <p><strong>Contacto telefónico:</strong> {user?.telephoneNumber}</p>
                        <p><strong>NIF:</strong> {user?.nif}</p>
                        <p><strong>Distrito:</strong> {user?.district?.districtName}</p>
                    </div>

                    <div className="info-column">
                        <p><strong>Concelho:</strong> {user?.municipality?.municipalityName}</p>
                        <p><strong>Freguesia:</strong> {user?.parish?.parishName}</p>
                        <p><strong>Elegível:</strong> Sim</p>
                        <p><strong>Verificado:</strong> Sim</p>
                    </div>
                </div>
                <div className="confirmation">
                    <label>
                        <input type="checkbox" id="dataConfirmation" name="dataConfirmation"
                               onChange={() => setConfirmed(!confirmed)}/>
                        Verifico que os dados acima registados estão corretos
                    </label>
                    <button className="vote-button" onClick={handleClick}>Prosseguir</button>
                </div>
            </section>
        </div>

    );
};

export default VoterData;