import Header from "../componentsAPP/Header.jsx";

const Faq = () => {
    return (
        <>
            <Header />
            <main className="general-container">
                <h1>FAQ</h1>
                <section>
                    <h2>Como posso comprar bilhetes?</h2>
                    <p>Os bilhetes podem ser adquiridos online através do nosso site ou em pontos de venda autorizados.</p>
                </section>
                <section>
                    <h2>Quais são os horários dos concertos?</h2>
                    <p>Os horários dos concertos estão disponíveis na nossa página de programação.</p>
                </section>
                <section>
                    <h2>Há estacionamento disponível no local?</h2>
                    <p>Sim, há estacionamento disponível, mas recomendamos o uso de transportes públicos para evitar congestionamentos.</p>
                </section>
            </main>
        </>
    );
};

export default Faq;
