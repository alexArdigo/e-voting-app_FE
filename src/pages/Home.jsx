const Home = () => {



    return (
        <main className="home-container">
            <div className="overlay">
                <img src="/images/rep_portuguesa_white.png" alt="Logo República Portuguesa" className="home-logo" />
                <form action="/voter-data">
                <button className="vote-button">EU VOTO</button>
                </form>
            </div>
        </main>
    );
};

export default Home;