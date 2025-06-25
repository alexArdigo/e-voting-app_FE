export const Header = () => {
    return (

        <div className="nav-container">
            <div className="nav-logo">
                <img src="public/images/rep_portuguesa_white.png" alt="Logo" height="100"/>
            </div>
            <div className="nav-navigation">
                <nav className="nav-bar">
                    <ul>
                        <li>Contacto</li>
                        <li>Ajuda</li>
                        <li>
                            <button>Login</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
