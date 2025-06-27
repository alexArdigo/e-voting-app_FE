import Header from "../componentsAPP/Header.jsx";
import {useEffect, useState} from "react";
import api from "../services/api.jsx";
import HelpComment from "../componentsAPP/HelpComment.jsx";
import {toast} from "react-toastify";
import {useUserContext} from "../services/UserContext.jsx";

const Faq = () => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const {user} = useUserContext();

    const [adminAnswerText, setAdminAnswerText] = useState("");

    useEffect(() => {
        async function fetchComments() {
            try {
                const comentarios = await api.get(`/comments`);
                setComments(comentarios.data);
            } catch (error) {
                alert("Erro ao carregar comentários.");
            }
        }

        fetchComments();
    }, []);

    const handleAdminReply = async (e, commentId) => {
        e.preventDefault();
        if (!adminAnswerText.trim()) return;

        const form = new FormData();
        form.set("text", adminAnswerText);

        try {
            await api.post(`/comment/${commentId}/answer`, form);
            toast("Comentário respondido com sucesso!");
            setAdminAnswerText("");
        } catch (err) {
            toast("Erro ao responder comentário.");
        }
    };

    const handleInput = (e) => {
        setNewComment(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newComment.trim()) {
            toast("Comentário não pode estar vazio.");
            return;
        }

        try {
            let body = new FormData();
            body.set("text", newComment)
            const response = await api.post(`/comment`, body);

            setComments([...comments, response.data]);
            setNewComment("");

        } catch (e) {
            toast("Erro ao adicionar um comentário.");
        }
    }


    return (
        <>
            <Header/>
            <main className="general-container">
                <h1>FAQ</h1>

                <section className="comment-section">
                    <h2>Comentários</h2>
                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>{comment.localDateTime}</p>
                                {user?.role === "ADMIN" && (
                                    <form onSubmit={(e) => handleAdminReply(e, comment.id)}>
                <textarea
                    value={adminAnswerText}
                    onChange={(e) => setAdminAnswerText(e.target.value)}
                />
                                        <button type="submit">Responder</button>
                                    </form>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="comentarios">Tem mais alguma pergunta? Escreva suas dúvidas abaixo.</label>
                        <textarea
                            name="comentarios"
                            id="comentarios"
                            value={newComment}
                            placeholder="Compartilhe suas expectativas, sugestões ou dúvidas sobre o festival..."
                            onChange={handleInput}
                        ></textarea>
                    </section>
                    <input type={"submit"} value={"Enviar"} className={"submit-button"}/>
                </form>

            </main>
        </>
    );
};

export default Faq;
