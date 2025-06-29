import Header from "../components/common/Header.jsx";


const MainLayout = ({ children }) => (
    <>
        <Header/>
        <main className="dflx " >{children}</main>
    </>
);

export default MainLayout;