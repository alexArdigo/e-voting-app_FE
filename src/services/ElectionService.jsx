
import api from "./api.jsx";

const getElection = async (election_id) => {
    const response = await api.get(`/elections/${election_id}`);
    return response.data;
};

const getAllElections = async () => {
    const response = await api.get("/elections");
    return response.data;
};

const getNotActiveElections = async () => {
    const response = await api.get("/election/notactive");
    return Array.isArray(response.data) ? response.data : [];
};

const getActiveElections = async () => {
    const response = await api.get("/election/active");
    const data = response.data;
    return Array.isArray(data) ? data : [data];
};

const hasVoterVotedList = async () => {
    const response = await api.get(`/voters/has-voted?nif=${encodeURIComponent(user?.nif || '')}`);
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

export {
    getElection,
    getAllElections,
    getNotActiveElections,
    getActiveElections,
    hasVoterVotedList,
    createElection,
    updateElection,
    deleteElection
};