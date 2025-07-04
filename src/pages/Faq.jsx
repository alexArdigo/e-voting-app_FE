import MainLayout from "../layouts/MainLayout.jsx";
import { useEffect, useState } from "react";
import api from "../services/api.jsx";
import HelpComment from "../components/specific/HelpComment.jsx";
import { toast } from "react-toastify";
import { useUserContext } from "../services/UserContext.jsx";
import HalfLogo from "../components/common/HalfLogo.jsx";

const Faq = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [adminAnswerTexts, setAdminAnswerTexts] = useState({});
    const { user } = useUserContext();

    useEffect(() => {
        async function fetchComments() {
            try {
                const comentarios = await api.get(`/comments`);
                setComments(comentarios.data);
            } catch (error) {
                toast("Erro ao carregar comentários.");
            }
        }

        fetchComments();
    }, []);

    const handleAdminReply = async (e, commentId) => {
        e.preventDefault();
        const text = adminAnswerTexts[commentId];
        if (!text?.trim()) return;

        const form = new FormData();
        form.set("text", text);

        try {
            await api.post(`/comment/${commentId}/answer`, form);
            toast("Comentário respondido com sucesso!");
            setAdminAnswerTexts((prev) => ({ ...prev, [commentId]: "" }));
        } catch (err) {
            toast("Erro ao responder comentário.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            toast("Comentário não pode estar vazio.");
            return;
        }

        try {
            const body = new FormData();
            body.set("text", newComment);
            const response = await api.post(`/comment`, body);

            setComments([...comments, response.data]);
            setNewComment("");
        } catch (e) {
            toast("Erro ao adicionar um comentário.");
        }
    };

    return (
        <MainLayout>
            <div className="general-container">
                <h1 className="pt-sans-bold">FAQ</h1>

                <section className="comment-section">
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment.id} className="faq-comment">
                                <HelpComment
                                    id={comment.id}
                                    comment_text={comment.comment}
                                    pub_datetime={comment.localDateTime}
                                    likes={comment.likedBy}
                                    answer={comment.answer?.answer}
                                />

                                {user?.role === "ADMIN" && (
                                    <form
                                        onSubmit={(e) => handleAdminReply(e, comment.id)}
                                        className="admin-reply-form"
                                    >
                                        <textarea
                                            value={adminAnswerTexts[comment.id] || ""}
                                            onChange={(e) =>
                                                setAdminAnswerTexts({
                                                    ...adminAnswerTexts,
                                                    [comment.id]: e.target.value,
                                                })
                                            }
                                            placeholder="Responder a este comentário..."
                                            required
                                        />
                                        <button type="submit">Responder</button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <form onSubmit={handleSubmit} className="faq-form">
                    <label htmlFor="comentarios" className="pt-sans-bold">
                        Tem mais alguma pergunta? Escreva suas dúvidas abaixo.
                    </label>
                    <textarea
                        name="comentarios"
                        id="comentarios"
                        value={newComment}
                        placeholder="Compartilhe suas expectativas, sugestões ou dúvidas sobre a plataforma ou eleição..."
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    ></textarea>
                    <div className={"button-wrapper"}>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
                <HalfLogo />
            </div>
        </MainLayout>
    );
};

export default Faq;