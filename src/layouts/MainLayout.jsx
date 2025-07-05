

const MainLayout = ({ children, className = "dflx", style }) => (
    <main
        className={className}
        style={style}
    >
        {children}
    </main>
);

export default MainLayout;