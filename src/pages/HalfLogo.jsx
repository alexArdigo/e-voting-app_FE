import MainLayout from "./MainLayout.jsx";
import StyledContainer from "./StyledContainer.jsx";


const HalfLogo = ({...props }) => (


    <img
        className="half-logo"
        src="./images/legislativas_halfLogo.png"
        alt="half-logo"
        {...props}
    />

);

export default HalfLogo;