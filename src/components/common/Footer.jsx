import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} Governo da República Portuguesa. Todos os direitos reservados.</p>
                <div className="footer-links">
                    <Link to="/contact">Contacto</Link>
                    <Link to="/help">Ajuda</Link>
                    <Link to="/faq">FAQ</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;