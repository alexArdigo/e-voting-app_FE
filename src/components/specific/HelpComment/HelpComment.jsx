import { useEffect, useState } from "react";
import { useUserContext } from "../../../services/UserContext.jsx";
import { toast } from "react-toastify";
import api from "../../../services/api.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./HelpComment.css";


const HelpComment = ({ id, comment_text, pub_datetime, answer, likes = [] }) => {
    const { user } = useUserContext();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length);

    useEffect(() => {
        const fetchHasLiked = async () => {
            if (user && user.role === "VOTER") {
                try {
                    const response = await api.get(`/comment/${id}/hasLiked`);
                    setLiked(response.data);
                } catch (error) {
                    console.error("Erro ao verificar like:", error);
                }
            }
        };

        fetchHasLiked();
    }, [user, id]);

    const handleLike = async () => {
        if (!user) {
            toast.warn("É necessário iniciar sessão para dar like.");
            return;
        }

        if (user.role !== "VOTER") {
            toast.warn("Apenas eleitores podem considerar comentários úteis.");
            return;
        }

        try {
            if (!liked) {
                await api.post(`/comment/${id}/like`);
                setLiked(true);
                setLikeCount((prev) => prev + 1);
            } else {
                toast.warn("Você já considerou este comentário útil.");
            }
        } catch (e) {
            toast.warn("Ocorreu um erro ao processar o seu like.");
        }
    };

    return (
        <>
            <p className="faq-comment-text">{comment_text}</p>
            <p className="faq-comment-time">
                <em>{new Date(pub_datetime).toLocaleString()}</em>
            </p>

            <div className="like-row">
                <span>Este comentário foi útil?</span>
                <button type="button" onClick={handleLike}>
                    {liked ? (
                        <FontAwesomeIcon icon={faThumbsUp} />
                    ) : (
                        <FontAwesomeIcon icon={faThumbsUp} style={{ color: "black" }} />
                    )}
                </button>
                <span>{likeCount}</span>
            </div>

            {answer && (
                <div className="admin-answer">
                    <strong>Resposta do Admin:</strong>
                    <p>{answer}</p>
                </div>
            )}
        </>
    );
};

export default HelpComment;