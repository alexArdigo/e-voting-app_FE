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
    return await getElections('presidential', electionYear, isActive);
};

const getLegislativeElections = async (electionYear, isActive) => {
    const params = new URLSearchParams();
    if (electionYear) params.append('electionYear', electionYear);
    if (isActive !== undefined) params.append('isActive', isActive);

    const response = await api.get(`/elections/legislative?${params}`);
    return Array.isArray(response.data) ? response.data : [];
};

const getLegislativeById = async (id) => {
    const response = await api.get(`/legislatives/${id}`);
    return response.data;
};

const getAllElections = () => getElections();
const getActiveElections = () => getElections(null, null, true);
const getNotActiveElections = () => getElections(null, null, false);
const getActivePresidentialElections = () => getPresidentialElections(null, true);
const getActiveLegislativeElections = () => getLegislativeElections(null, true);

const hasVoterVotedList = async (user) => {
    const body = new FormData();
    body.set("nif", user?.nif);
    const response = await api.post(`/voters/has-voted`, body);
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
    const response = await api.post("/elections", electionData);
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

export {
    getElection,
    getElections,
    getPresidentialElections,
    getLegislativeElections,
    getLegislativeById,
    getAllElections,
    getActiveElections,
    getNotActiveElections,
    getActivePresidentialElections,
    getActiveLegislativeElections,
    hasVoterVotedList,
    getBallotByElectionId,
    castVote,
    createElection,

    updatePresidentialElection,
    updateLegislativeElection,
    updateElectoralCircle,

    deletePresidentialElection,
    deleteLegislativeElection,
    deleteElectoralCircle,
};