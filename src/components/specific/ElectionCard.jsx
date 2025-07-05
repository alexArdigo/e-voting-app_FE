const ElectionCard = ({ election }) => (
    <div className="election-card">
        <h4 className="elections-title">{election.name}</h4>
        <div className="election-details">
            <p><strong>Tipo:</strong> {election.type === "PRESIDENTIAL" ? "Presidencial" : "Círculo Eleitoral"}</p>
            {election.totalVotes !== undefined && (
                <p><strong>Total de votos:</strong> {election.totalVotes}</p>
            )}
            <p><strong>Início:</strong> {new Date(election.startDate).toLocaleString('pt-PT')}</p>
            <p><strong>Fim:</strong> {new Date(election.endDate).toLocaleString('pt-PT')}</p>

            {election.type === "CIRCULO_ELEITORAL" && (
                <>
                    <p><strong>Distrito:</strong> {election.districtName ?? "N/A"}</p>
                    <p><strong>Município:</strong> {election.municipalityName ?? "N/A"}</p>
                    <p><strong>Freguesia:</strong> {election.parishName ?? "N/A"}</p>
                    <p><strong>Nº de Mandatos:</strong> {election.seats ?? "N/A"}</p>
                </>
            )}

            {election.parties?.length > 0 && (
                <p><strong>Partidos:</strong> {election.parties.map(p => p.name).join(", ")}</p>
            )}

            {election.ended !== undefined && (
                <p><strong>Status:</strong> {election.ended ? "Finalizada" : "Não Iniciada"}</p>
            )}
        </div>
    </div>
);
export default ElectionCard;