import { useEffect, useState } from "react";
import { useUserContext } from "../../services/UserContext.jsx";
import { toast } from "react-toastify";
import api from "../../services/api.jsx";

const HelpComment = ({ id, comment_text, pub_datetime, likes, answer }) => {
    const { user } = useUserContext();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user) {
            const hasLiked = likes.includes(user.id);
            setLiked(hasLiked);
        }
    }, [user, likes]);

    const handleLike = async () => {
        if (!user) {
            toast("É necessário iniciar sessão para dar like.");
            return;
        }

        try {
            if (!liked) {
                await api.post(`/comments/${id}/like`);
                setLiked(true);
            } else {
                await api.post(`/comments/${id}/dislike`);
                setLiked(false);
            }
        } catch (e) {
            toast("Ocorreu um erro ao processar o seu like.");
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
                    {liked ? "\u2665" : "\u2661"}
                </button>
                <span>{likes.length}</span>
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