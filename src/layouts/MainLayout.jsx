import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer";


const MainLayout = ({ children, className = "dflx", style }) => (
    <>
        <Header/>
        <main
            className={className}
            style={style}
        >{children}</main>
        <Footer/>
    </>
);

export default MainLayout;