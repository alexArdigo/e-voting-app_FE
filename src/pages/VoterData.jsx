import Header from "../componentsAPP/Header.jsx";
import {useUserContext} from "../services/UserContext.jsx";

const VoterData = () => {

    const { user } = useUserContext();

    return (
    <div>
        <Header/>
        <h1>Voter Data</h1>
        <div>
            <p><strong>Nome:</strong> {user ? `${user.firstName} ${user.lastName}` : "N/A"}</p>
            <p><strong>Contacto telefónico:</strong> {user?.telephoneNumber}</p>
            <p><strong>NIF:</strong> {user?.nif}</p>
        </div>

        <div>
            <p><strong>Distrito:</strong> {user?.district}</p>
            <p><strong>Concelho:</strong> {user?.municipality}</p>
            <p><strong>Freguesia:</strong> {user?.parish}</p>
            <p><strong>Elegível:</strong> {user?.eligible ? "Sim" : "Não"}</p>
            <p><strong>Verificado:</strong> {user?.verified ? "Sim" : "Não"}</p>
        </div>
        <input
            type="radio"
            id="dataConfirmation"
            name="dataConfirmation"
        />
        <label htmlFor="dataConfirmation">
            Verifico que os dados acima registados estão corretos
        </label>

    </div>
  );
}
export default VoterData;