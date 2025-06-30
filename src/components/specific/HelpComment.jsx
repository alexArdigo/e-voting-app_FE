import {useEffect, useState} from "react";
import {useUserContext} from "../../services/UserContext.jsx";
import {toast} from "react-toastify";
import api from "../../services/api.jsx";

const HelpComment = ({ id, comment_text, pub_datetime, likes, answer }) => {

    const contexto = useUserContext();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (contexto.user) {
            const hasLiked = likes.includes(contexto.user.id);
            setLiked(hasLiked);
        }
    }, [contexto.user, likes]);

    const handleLike = async () => {
        if (!contexto.user) {
            toast("É necessário iniciar sessão para dar like.");
            return;
        }
        try {
            if (!liked) {
                const response = await api.post(`/comments/${id}/like`);
                setLiked(true);
            } else {
                const response = await api.post(`/comments/${id}/dislike`);
                setLiked(false);
            }
        } catch (e) {
            toast("Ocorreu um erro ao processar o seu like.");
            console.error("Erro ao dar like:", e);
        }
    };

    return (
        <div className="comment">
            <p className="comment-text">{comment_text}</p>
            <p><em>{new Date(pub_datetime).toLocaleString()}</em></p>
            <div className="like-row">
                <span>Este comentário foi útil?</span>
                <button type="button" onClick={handleLike}>{liked ? "\u2665" : "\u2661"}</button>
            </div>
            {answer && (
                <div className="admin-answer">
                    <strong>Resposta do Admin:</strong>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default HelpComment;
