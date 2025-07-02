import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer";


const MainLayout = ({ children, className = "dflx", style }) => (
    <>

        <main
            className={className}
            style={style}
        >{children}</main>

    </>
);

export default MainLayout;