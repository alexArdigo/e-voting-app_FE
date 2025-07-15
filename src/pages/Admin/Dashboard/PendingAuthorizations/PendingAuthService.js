// import api from "../../../../services/api";
//
// export const fetchData = async () => {
//     try {
//         const response = await api.get("/pendingAuthorization");
//         return response.data || [];
//     } catch (e) {
//         console.error("Error fetching pending users", e);
//     }
// };
//
// export const fetchApproved = async () => {
//     try {
//         const response = await api.get("/approvedViewers");
//         return response.data || [];
//     } catch (e) {
//         console.error("Error fetching approved users", e);
//     }
// };
//
// export const handleApprove = async (id, refetchCallback) => {
//     try {
//         await api.post(`/approveViewer?id=${id}`);
//         if (refetchCallback) {
//             await refetchCallback();
//         }
//     } catch (error) {
//         console.error("Error approving user:", error);
//     }
// };
//
// export const handleRemove = async (id, refetchCallback) => {
//     try {
//         await api.post(`/deleteApprovedViewer?id=${id}`);
//         if (refetchCallback) {
//             await refetchCallback();
//         }
//     } catch (error) {
//         console.error("Error deleting user:", error);
//     }
// };