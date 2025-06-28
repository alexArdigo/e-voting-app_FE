const Home = () => {



    return (
        <main className="main-container">
            <div className="overlay">
                <img src="/images/rep_portuguesa_white.png" alt="Logo República Portuguesa" className="main-logo" />
                <form action="/voter-data">
                <button className="vote-button">EU VOTO</button>
                </form>
            </div>
        </main>
    );
};

export default Home;