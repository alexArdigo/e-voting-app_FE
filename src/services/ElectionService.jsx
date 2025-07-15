import api from "./api.jsx";

const getElection = async (electionId) => {
    const response = await api.get(`/elections/${electionId}`);
    return response.data;
};

const getElections = async (electionType, electionYear, isActive) => {
    const params = new URLSearchParams();

    if (electionType) params.append('electionType', electionType);
    if (electionYear) params.append('electionYear', electionYear);
    if (isActive !== undefined) params.append('isActive', isActive);

    const response = await api.get(`/elections?${params}`);
    return Array.isArray(response.data) ? response.data : [];
};

const getPresidentialElections = async (electionYear, isActive) => {
    return await getElections('PRESIDENTIAL', electionYear, isActive);
};

const getLegislativeElections = async (electionYear, isActive) => {
    const params = new URLSearchParams();
    if (electionYear) params.append('electionYear', electionYear);
    if (isActive !== undefined) params.append('isActive', isActive);

    const response = await api.get(`/elections/legislative?${params}`);
    return Array.isArray(response.data) ? response.data : [];
};

const getElectoralCircleElections = async (electionYear, isActive) => {
    return await getElections('ELECTORAL_CIRCLE', electionYear, isActive);
};

const getLegislativeById = async (id) => {
    const response = await api.get(`/legislatives/${id}`);
    return response.data;
};

const getAllElections = async () => {
    try {
        const presidentialAndCircles = await getElections();

        const legislative = await getLegislativeElections();

        return [...presidentialAndCircles, ...legislative];
    } catch (error) {
        console.error('Erro ao buscar todas as eleições:', error);
        return [];
    }
};

const getActiveElections = async () => {
    try {
        const presidentialAndCircles = await getElections(null, null, true);

        const legislative = await getLegislativeElections(null, true);

        return [...presidentialAndCircles, ...legislative];
    } catch (error) {
        console.error('Erro ao buscar eleições ativas:', error);
        return [];
    }
};

const getNotActiveElections = async () => {
    try {
        const presidentialAndCircles = await getElections(null, null, false);

        const legislative = await getLegislativeElections(null, false);

        return [...presidentialAndCircles, ...legislative];
    } catch (error) {
        console.error('Erro ao buscar eleições não ativas:', error);
        return [];
    }
};

const getActivePresidentialElections = () => getPresidentialElections(null, true);
const getActiveLegislativeElections = () => getLegislativeElections(null, true);
const getActiveElectoralCircleElections = () => getElectoralCircleElections(null, true);

const voterHasVotedElectionList = async (user) => {
    const body = new FormData();
    body.set("voterId", user?.id);
    const response = await api.post(`/voters/has-voted-list`, body);
    if (response.status !== 200) {
        throw new Error("Failed to fetch voter voted list");
    }
    return response.data;
};

const voterHasVotedThisElection = async (electionId, voterId) => {
    const body = new FormData();
    body.set("electionId", electionId);
    body.set("voterId", voterId);
    const response = await api.post(`/voters/has-voted-election`, body);
    if (response.status !== 200) {
        throw new Error("Failed to fetch voter voted list");
    }
    return response.data;
};

const getBallotByElectionId = async (id) => {
    const response = await api.get(`/elections/${id}/ballot`);
    return response.data;
};

const castVote = async (electionId, vote) => {
    const response = await api.post(`/elections/${electionId}/castVote`, vote);
    return response.data;
};

const createElection = async (electionData) => {
    return await api.post("/elections", electionData);

};

const uploadCSVFile = async (body) => {
    const response = await api.post("/elections/uploadCSV", body, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

const updatePresidentialElection = async (electionId, electionData) => {
    const response = await api.put(`/elections/presidential/${electionId}`, electionData);
    return response.data;
};

const updateLegislativeElection = async (legislativeId, legislativeData) => {
    const response = await api.put(`/elections/legislative/${legislativeId}`, legislativeData);
    return response.data;
};

const updateElectoralCircle = async (circleId, circleData) => {
    const response = await api.put(`/elections/electoral-circle/${circleId}`, circleData);
    return response.data;
};

const deletePresidentialElection = async (electionId) => {
    const response = await api.delete(`/elections/presidential/${electionId}`);
    return response.data;
};

const deleteLegislativeElection = async (legislativeId) => {
    const response = await api.delete(`/elections/legislative/${legislativeId}`);
    return response.data;
};

const deleteElectoralCircle = async (circleId) => {
    const response = await api.delete(`/elections/electoral-circle/${circleId}`);
    return response.data;
};

const getTotalVotesByElection = async (electionId) => {
    const response = await api.get(`/total-votes-by-election`, {
        params: { electionId }
    });
    return response.data;
};

export {
    getElection,
    getElections,
    getPresidentialElections,
    getLegislativeElections,
    getElectoralCircleElections,
    getLegislativeById,
    getAllElections,
    getActiveElections,
    getNotActiveElections,
    getActivePresidentialElections,
    getActiveLegislativeElections,
    getActiveElectoralCircleElections,
    voterHasVotedElectionList,
    voterHasVotedThisElection,
    getBallotByElectionId,
    castVote,
    createElection,
    uploadCSVFile,

    updatePresidentialElection,
    updateLegislativeElection,
    updateElectoralCircle,

    deletePresidentialElection,
    deleteLegislativeElection,
    deleteElectoralCircle,
    getTotalVotesByElection
};