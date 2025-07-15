// import React, {useEffect, useState} from 'react';
// import PendingAuthContainer from "./PendingAuthContainer";
// import {fetchApproved, fetchData, handleApprove, handleRemove} from "./PendingAuthService";
// import {useOutletContext} from "react-router-dom";
//
// const PendingAuthorizationsOriginal = () => {
//     const setHasPendingViewer = useOutletContext();
//     const [pendingUsers, setPendingUsers] = useState([]);
//     const [approvedUsers, setApprovedUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [searchTermApproved, setSearchTermApproved] = useState("");
//
//     const filteredPending = pendingUsers.filter(user =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     const filteredApproved = approvedUsers.filter(user =>
//         user.username.toLowerCase().includes(searchTermApproved.toLowerCase())
//     );
//
//     const fetch = async () => {
//         try {
//             const data = await fetchData();
//             setPendingUsers(data);
//             setApprovedUsers(await fetchApproved());
//             setHasPendingViewer(data)
//         } catch (e) {
//             console.error("Error fetching pending and approved users", e);
//         }
//     };
//
//     useEffect(() => {
//         fetch();
//     }, [handleApprove, handleRemove]);
//
//     const onApprove = async (id) => {
//         await handleApprove(id, fetch);
//     };
//
//     const onRemove = async (id) => {
//         await handleRemove(id, fetch);
//     };
//
//
//     const state = {
//         pending: {
//             id: "pending",
//             style: {width: "22vw"},
//             h1: "Pendentes de Aprovação",
//             p: "Lista de utilizadores pendentes de aprovação",
//             type: "text",
//             placeholder: "Pesquisar utilizador...",
//             action: "Aprovar",
//             className: "button-pending-list",
//         },
//         approved: {
//             id: "approved",
//             style: {width: "22vw"},
//             h1: "Remover utilizador",
//             p: "Lista de utilizadores aprovados:",
//             type: "text",
//             placeholder: "Pesquisar utilizador...",
//             action: "Remover",
//             className: "button-pending-list-remove",
//         }
//     };
//
//
//     return (
//         <div >
//             <div className="admin-container">
//                 <h1>Lista de Utilizadores a Aguardar Aprovação</h1>
//                 <p>Aprove o utilizador no sistema</p>
//             </div>
//             <div className="dflx" style={{width: "100%", justifyContent: "space-around", flexWrap: "wrap", gap: 20}}>
//                 <PendingAuthContainer
//                     state={state.pending}
//                     value={searchTerm}
//                     handleOnChange={setSearchTerm}
//                     list={filteredPending}
//                     handleOnClick={onApprove}
//                 />
//
//                 <PendingAuthContainer
//                     state={state.approved}
//                     value={searchTermApproved}
//                     handleOnChange={setSearchTermApproved}
//                     list={filteredApproved}
//                     handleOnClick={onRemove}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default PendingAuthorizationsOriginal;
