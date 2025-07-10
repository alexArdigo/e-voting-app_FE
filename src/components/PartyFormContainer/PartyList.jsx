import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../services/api";

const PartyList = () => {
    const [parties, setParties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await api.get("/organisations");
                const allParties = response.data;

                const seenNames = new Set();
                const uniqueParties = allParties.filter((party) => {
                    if (seenNames.has(party.name)) {
                        return false;
                    }
                    seenNames.add(party.name);
                    return true;
                });

                setParties(uniqueParties);
            } catch (error) {
                console.error("Erro ao buscar partidos", error);
            }
        };

        fetchParties();
    }, []);

    return (
        <div className="party-list">
            <h2>Lista de Partidos</h2>

            {parties.length === 0 ? (
                <p>Não há partidos cadastrados.</p>
            ) : (
                <ul>
                    {parties.map((party) => (
                        <li key={party.id} style={{ marginBottom: "10px" }}>
                            <span style={{ marginRight: "10px" }}>{party.name}</span>
                            <button onClick={() => navigate(`/admin/edit/parties/${party.id}`)}>
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={() => navigate("/admin/add/party")} style={{ marginTop: "20px" }}>
                + Adicionar Partido
            </button>
        </div>
    );
};

export default PartyList;