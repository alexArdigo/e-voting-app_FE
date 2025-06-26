export const Header = () => {
    return (
        <header>
            <div className="logo-bar">
                <img src="public/images/rep_portuguesa_white.png" alt="Logo" height="100" />
            </div>
            <div className="nav-bar">
                <ul>
                    <li>Contacto</li>
                    <li>Ajuda</li>
                    <li>
                        <button>Login</button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;