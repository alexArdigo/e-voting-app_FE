import React from 'react';
import {useUserContext} from "../services/UserContext.jsx";

const VoterData = () => {

    const { user } = useUserContext();

    return (
        <section className={"voter-data-container"}>

            <div className={"profile-icon"}></div>

            <div className={"voter-info"}>
                <p><strong>Nome:</strong> {user ? `${user.firstName} ${user.lastName}` : "N/A"}</p>
                <p><strong>Contacto telefónico:</strong> {user?.telephoneNumber}</p>
                <p><strong>NIF:</strong> {user?.nif}</p>
                <p><strong>Distrito:</strong> {user?.district}</p>
                <p><strong>Concelho:</strong> {user?.municipality}</p>
                <p><strong>Freguesia:</strong> {user?.parish}</p>
                <p><strong>Elegível:</strong> {user?.eligible ? "Sim" : "Não"}</p>
                <p><strong>Verificado:</strong> {user?.verified ? "Sim" : "Não"}</p>
                <div className="confirmation">
                    <label>
                        <input type="radio" id="dataConfirmation" name="dataConfirmation" />
                        Verifico que os dados acima registados estão corretos
                    </label>
                    <button className="vote-button">Prosseguir</button>
                </div>
            </div>
        </section>
    );
};

export default VoterData;