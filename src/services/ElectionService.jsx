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

export {
    getElection,
    getAllElections,
    getNotActiveElections,
    getActiveElections
};
