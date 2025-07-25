import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../../services/api";
import "../Admin.css"
import AdminDashboard from "../Dashboard/AdminDashboard";

const PartyList = () => {
    const [parties, setParties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchParties = async () => {
            try {
                const response = await api.get("/parties");
                const allParties = response.data;

                const seenNames = new Set();
                const uniqueParties = allParties.filter((party) => {
                    if (seenNames.has(party.name)) {
                        return false;
                    }
                    seenNames.add(party.name);
                    return true;
                });

                const sortedParties = uniqueParties.sort((a, b) => a.name.localeCompare(b.name));

                setParties(sortedParties);
            } catch (error) {
                console.error("Erro ao buscar partidos", error);
            }
        };

        fetchParties();
    }, []);

    return (
        <div className="party-list-container">
            <h2 className="party-list-title">Lista de Partidos</h2>

            {parties.length === 0 ? (
                <p className="no-parties-message">Não há partidos.</p>
            ) : (
                <ul className="party-list">
                    {parties.map((party) => (
                        <li key={party.id} className="party-list-item">
                            <span className="party-name">{party.name}</span>
                            <button className="edit-button" onClick={() => navigate(`/admin/edit/parties/${party.id}`)}>
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default PartyList;