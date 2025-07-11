import React from 'react';

const BallotOption = ({party, isSelected, onSelect}) => {
    return (
        <div
            className={`ballot-option ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(party.id)}
        >
            <input
                type="radio"
                id={`party-${party.id}`}
                name="party"
                value={party.id}
                checked={isSelected}
                onChange={() => onSelect(party.id)}
            />
            <label htmlFor={`party-${party.id}`} className="ballot-label">
                {/* <div className="party-image-container">
                    <img
                        src={party.logoUrl}
                        alt={`Logo ${party.name}`}
                        className="party-image"
                    />
                </div> */}

                <div className="party-info">
                    <span className="party-abbreviation">{party.name}</span>
                </div>
            </label>
        </div>
    );
};

export default BallotOption;