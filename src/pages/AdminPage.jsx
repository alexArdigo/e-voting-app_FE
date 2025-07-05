import AdminDashboard from "../components/specific/AdminDashboard";
import { useEffect, useState } from "react";
import { getActiveElections, getNotActiveElections } from "../services/ElectionService";
import { toast } from "react-toastify";
import ElectionCard from "../components/specific/ElectionCard";

const AdminPage = () => {
    const [activeElections, setActiveElections] = useState([]);
    const [notActiveElections, setNotActiveElections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadElections();
    }, []);

    const loadElections = async () => {
        try {
            setLoading(true);
            const [active, notActive] = await Promise.all([
                getActiveElections(),
                getNotActiveElections()
            ]);
            setActiveElections(Array.isArray(active) ? active : []);
            setNotActiveElections(Array.isArray(notActive) ? notActive : []);
        } catch (error) {
            console.error('Erro ao buscar eleições:', error);
            toast.error("Erro ao buscar eleições");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="general-container">
                <h1>Página de Administração</h1>
                <p>A carregar os dados...</p>
            </div>
        );
    }

    return (
        <div className="general-container">
            <h1>Página de Administração</h1>
            <p>
                Bem-vindo à página de administração. Aqui você pode gerenciar as eleições e visualizar autorizações pendentes.
            </p>

            <AdminDashboard/>

            <div className="elections-grid">
                <div className="elections-section">
                    <h2 className="active-elections-title">
                        Eleições Ativas ({activeElections.length})
                    </h2>

                    {activeElections.length > 0 ? (
                        <div className="election-list">
                            {activeElections.map((election) => (
                                <ElectionCard key={election.id} election={election} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-elections-message">Nenhuma eleição ativa encontrada.</p>
                    )}
                </div>

                <div className="elections-section">
                    <h2 className="elections-title">
                        Eleições Não Ativas ({notActiveElections.length})
                    </h2>

                    {notActiveElections.length > 0 ? (
                        <div className="election-list">
                            {notActiveElections.map((election) => (
                                <ElectionCard key={election.id} election={election} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-elections-message">Nenhuma eleição não ativa encontrada.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;