import Header from "../components/common/Header.jsx";


const MainLayout = ({ children, className = "dflx", style }) => (
    <>
        <Header/>
        <main
            className={className}
            style={style}
        >{children}</main>
    </>
);

export default MainLayout;