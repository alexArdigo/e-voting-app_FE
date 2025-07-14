import React from 'react';

const PendingAuthCard = ({obj, className, handleOnClick, action}) => {

    return (
        <li style={{
            display: "flex",
            width: "280px",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            gap: 10
        }}>
            <p>
                {obj.username}
            </p>
            <button
                className={className}
                onClick={() => handleOnClick(obj.id)}> {action}
            </button>
        </li>
    );
};

export default PendingAuthCard;