
import api from "./api.jsx";

const getElection = async (election_id) => {
    const response = await api.get(`/elections/${election_id}`);
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

const hasVoterVotedList = async (user) => {
    const body = new FormData();
    body.set("nif", user?.nif);
    const response = await api.post(`/voters/has-voted`, body);
    if (response.status !== 200) {
        throw new Error("Failed to fetch voter voted list");
    }
    return response.data;
};

const createElection = async (electionData) => {
    const response = await api.post("/elections", electionData);
    return response.data;
};

const updateElection = async (electionId, electionData) => {
    const response = await api.put(`/elections/${electionId}`, electionData);
    return response.data;
};

const deleteElection = async (electionId) => {
    const response = await api.delete(`/elections/${electionId}`);
    return response.data;
};

const getAllElections = () => getElections();
const getActiveElections = () => getElections(null, null, true);
const getNotActiveElections = () => getElections(null, null, false);

export {
    getElection,
    getElections,
    getAllElections,
    getNotActiveElections,
    getActiveElections,
    hasVoterVotedList,
    createElection,
    updateElection,
    deleteElection
};