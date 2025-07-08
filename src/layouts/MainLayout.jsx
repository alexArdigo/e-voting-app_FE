import HalfLogo from "../components/common/HalfLogo";


const MainLayout = ({ children, className = "dflx", style }) => (
    <main
        className={className}
        style={style}
    >
        <HalfLogo/>
        {children}
    </main>
);

export default MainLayout;