import Header from "../components/Header.jsx";
import {useUserContext} from "../services/UserContext.jsx";
import VoterData from "../Components/VoterData.jsx";

const VoterProfile = () => {

    const { user } = useUserContext();

    return (
    <div>
        <Header/>
        <VoterData/>
    </div>
  );
}
export default VoterProfile;