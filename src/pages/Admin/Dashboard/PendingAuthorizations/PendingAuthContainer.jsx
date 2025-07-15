// import React from 'react';
// import StyledContainer from "../../../../layouts/StyledContainer";
// import PendingAuthCard from "./PendingAuthCard";
// import InputNoLabel from "../../../../components/common/InputNoLabel";
//
// const PendingAuthContainer = ({state, value, list, handleOnClick, handleOnChange}) => {
//     const {id, h1, p, type, placeholder, style, className, action} = state
//     return (
//         <StyledContainer style={style}>
//             <h1>{h1}</h1>
//             <p>{p}</p>
//             <InputNoLabel
//                 id={id}
//                 type={type}
//                 value={value}
//                 style={{marginBottom: "10px", width: "50%"}}
//                 handleOnChange={handleOnChange}
//                 placeholder={placeholder}
//             />
//             {!list.length ? <p>{id === "pending" ? "Sem registos pendentes" : "Sem utilizadores"}</p>
//                 : <ul className="pending-users-ul">
//                 {list.map((user) => (
//                     <PendingAuthCard
//                         key={user?.id}
//                         obj={user}
//                         className={className}
//                         handleOnClick={handleOnClick}
//                         action={action}
//                     />
//                 ))}
//             </ul>
//             }
//         </StyledContainer>
//     );
// };
//
// export default PendingAuthContainer;