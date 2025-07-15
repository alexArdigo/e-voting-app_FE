import React from 'react';

const PendingAuthCard = ({obj, className, handleOnClick, action}) => {

    return (
        <li
            className="li-pending"
            style={{
            justifyContent: "space-between",
            flexWrap: "nowrap",
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