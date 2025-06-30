import React from 'react';

const Timer = ({ timeLeft }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer-container">
            <span className={`timer ${timeLeft <= 60 ? 'timer-warning' : ''}`}>
                {formatTime(timeLeft)}
            </span>
        </div>
    );
};

export default Timer;