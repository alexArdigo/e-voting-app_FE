import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../services/api";
import PartyAdd from "../../pages/PartyAdd";
import AdminDashboard from "../specific/Admin/AdminDashboard";

const PartyEdit = () => {
    const {id} = useParams();
    const [party, setParty] = useState(null);

    useEffect(() => {
        const fetchParty = async () => {
            try {
                const response = await api.get(`/parties/${id}`);
                setParty(response.data);
            } catch (error) {
                console.error("Failed to fetch party", error);
            }
        };

        fetchParty();
    }, [id]);

    if (!party) {
        return <div>Carregando dados do partido...</div>;
    }

    return (
        <PartyAdd party={party}/>
    );
};

export default PartyEdit;