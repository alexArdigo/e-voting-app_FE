import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";



const HalfLogo = ({...props }) => (


    <img
        className="half-logo"
        src="./images/legislativas_halfLogo.png"
        alt="half-logo"
        {...props}
    />

);

export default HalfLogo;