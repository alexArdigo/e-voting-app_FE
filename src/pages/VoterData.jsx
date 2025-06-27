import Header from "../componentsAPP/Header.jsx";
import {useUserContext} from "../services/UserContext.jsx";

const VoterData = () => {

    const context= useUserContext();
    const user = context.user;

  return (
    <div>
        <Header/>
        <h1>Voter Data</h1>
        <div>
            <p><strong>Nome:</strong> {user?.nome}</p>
            <p><strong>Data Nascimento:</strong> {user?.nascimento}</p>
            <p><strong>Contacto telefónico:</strong> {user?.telefone}</p>
            <p><strong>NIF:</strong> {user?.nif}</p>
        </div>

        <div>
            <p><strong>Círculo Eleitoral:</strong> {user?.circulo}</p>
            <p><strong>Freguesia:</strong> {user?.freguesia}</p>
            <p><strong>Elegível:</strong> {user?.elegivel ? "Sim" : "Não"}</p>
            <p><strong>Verificado:</strong> {user?.verificado ? "Sim" : "Não"}</p>
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