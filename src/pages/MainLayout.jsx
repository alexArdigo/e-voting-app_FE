import Header from "../Components/Header.jsx";


const MainLayout = ({ children, className = "dflx" }) => (
    <>
        <Header/>
        <main className={className} >{children}</main>
    </>
);

export default MainLayout;