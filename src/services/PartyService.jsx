import api from "./api.jsx";

const PartyService = {

    getAllParties: async () => {
        try {
            const response = await api.get("/parties");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar partidos:", error);
            throw error;
        }
    },

    getAllUniParties: async () => {
        try {
            const response = await api.get("/uniparties");
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar candidatos individuais:", error);
            throw error;
        }
    },

    getAllOrganisations: async (electionId = null, electoralCircleId = null) => {
        try {
            const params = new URLSearchParams();
            if (electionId) params.append('election', electionId);
            if (electoralCircleId) params.append('electoralCircle', electoralCircleId);

            const response = await api.get(`/organisations?${params.toString()}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar organizações:", error);
            throw error;
        }
    },

    getOrganisationById: async (organisationId) => {
        try {
            const response = await api.get(`/organisations/${organisationId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao buscar organização:", error);
            throw error;
        }
    },

    createOrganisation: async (organisationData) => {
        try {
            const response = await api.post("/organisations", organisationData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar organização:", error);
            throw error;
        }
    },

    updateOrganisation: async (organisationId, organisationData) => {
        try {
            const response = await api.put(`/organisations/${organisationId}`, organisationData);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar organização:", error);
            throw error;
        }
    },

    createParty: async (partyData) => {
        try {
            const response = await api.post("/parties", partyData);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar partido:", error);
            throw error;
        }
    },

    getOrganisationsByElectionType: async (electionType) => {
        try {
            if (electionType === 'PRESIDENTIAL') {
                return await PartyService.getAllUniParties();
            } else {
                return await PartyService.getAllParties();
            }
        } catch (error) {
            console.error("Erro ao buscar organizações por tipo:", error);
            throw error;
        }
    }
};

export default PartyService;