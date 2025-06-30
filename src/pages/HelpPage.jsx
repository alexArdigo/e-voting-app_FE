import React from 'react';
import MainLayout from "../layouts/MainLayout.jsx";
import StyledContainer from "../components/specific/StyledContainer.jsx";
import HalfLogo from "./HalfLogo.jsx";

const HelpPage = () => {
    return (
        <>
            <MainLayout>
                <StyledContainer variant="leftCentered" style={{marginTop: "110px"}}>
                    <h1 className="pt-sans-bold">
                        Ajuda
                    </h1>
                </StyledContainer>
                <StyledContainer variant="transparent" style={{width: "800px"}}>
                    <h1>Eleições Presidenciais:</h1>
                    <p>
                        Nas eleições presidenciais, os cidadãos escolhem quem será o Presidente da República. Cada eleitor pode votar num dos candidatos oficialmente apresentados. O Presidente é eleito por sufrágio direto e universal, e vence o candidato que obtiver mais de 50% dos votos válidos. Caso nenhum candidato alcance essa maioria absoluta na primeira volta, realiza-se uma segunda volta entre os dois mais votados. Neste sistema eletrónico, basta selecionar o seu candidato e confirmar o voto — o processo é simples, seguro e auditável.
                    </p>

                    <h1> Eleições Legislativas: </h1>
                    <p>
                        As eleições legislativas determinam a composição da Assembleia da República. Os eleitores votam em listas de partidos por círculo eleitoral, e os mandatos são atribuídos proporcionalmente com base nos votos recebidos por cada partido. O objetivo é garantir uma representação justa de todas as forças políticas. No sistema de voto eletrónico, poderá consultar as listas disponíveis no seu círculo e votar de forma rápida e confidencial, contribuindo para um processo democrático mais acessível e eficiente.
                    </p>

                </StyledContainer>
            </MainLayout>
            <HalfLogo></HalfLogo>

        </>
    );
};

export default HelpPage;