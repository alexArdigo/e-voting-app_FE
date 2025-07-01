import React from 'react';
import BallotOption from './BallotOption.jsx';

const BallotForm = ({ parties, selectedParty, onPartySelect }) => {
    return (
        <div className="ballot-options">
            {parties.map((party) => (
                <BallotOption
                    key={party.id}
                    party={party}
                    isSelected={selectedParty === party.id}
                    onSelect={onPartySelect}
                />
            ))}
        </div>
    );
};

export default BallotForm;