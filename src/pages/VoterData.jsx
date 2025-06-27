import Header from "../componentsAPP/Header.jsx";
import {useUserContext} from "../services/UserContext.jsx";

const VoterData = () => {

    const context= useUserContext();

  return (
    <div>
        <Header/>
        <h1>Voter Data</h1>
        <p>This page will display voter data.</p>
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