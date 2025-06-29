import {useNavigate} from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <main className="home-container">
            <div className="overlay">
                <img src="/images/rep_portuguesa_white.png" alt="Logo República Portuguesa" className="home-logo" />
                <button className="vote-button" onClick={() => navigate("/instructions")}>EU VOTO</button>
            </div>
        </main>
    );
};

export default Home;