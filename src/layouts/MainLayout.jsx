import HalfLogo from "../components/common/HalfLogo";


const MainLayout = ({children, className, style}) => {

    style = {
        ...style,
        width: "70vw",
        margin: "auto",
        padding: "50px 0 70px 0"
    }
    return (
        <main
            className={className}
            style={style}
        >
            <HalfLogo/>
            {children}
        </main>
    );
};

export default MainLayout;