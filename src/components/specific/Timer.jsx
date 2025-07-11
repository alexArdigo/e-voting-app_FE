import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import api from "../../services/api";
import {useUserContext} from "../../services/UserContext";
import {useLocation, useNavigate} from "react-router-dom";
import useIsTabActive from "../../hooks/useIsTabActive";

const Timer = ({parties, timeLeft, setTimeLeft}) => {
    const {user, isVoting, setIsVoting, logout} = useUserContext();
    const isTabActive = useIsTabActive();
    const navigate = useNavigate();
    const location = useLocation();

    const handleStartSession = async () => {
        try {
            const body = new FormData();
            body.set("electionId", location.state?.electionId);
            body.set("voterId", user?.id);
            const response = await api.post("/voters/start-voting", body);

            if (response.status === 200) {
                setTimeLeft(+response.data?.timeLeft);
            }

        } catch (error) {
            console.error("Error starting voting:", error);
        }
    };

    useEffect(() => {
        if (isTabActive) {
            handleStartSession();
        }
    }, [isTabActive]);

    useEffect(() => {
        if (timeLeft <= 0) {
            toast.error('Tempo esgotado! Será redirecionado...');
            setIsVoting(false);

            logout();
            setTimeout(() => navigate('/'), 3000);
            return;
        }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, navigate]);


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