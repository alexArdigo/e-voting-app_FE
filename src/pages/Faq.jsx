import Header from "../componentsAPP/Header.jsx";
import {useEffect, useState} from "react";
import api from "../services/api.jsx";
import HelpComment from "../componentsAPP/HelpComment.jsx";

const Faq = () => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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

    const handleInput = (e) => {
        setNewComment(e.target.value);
    }


    return (
        <>
            <Header />
            <main className="general-container">
                <h1>FAQ</h1>

                <section className="comment-section">
                    <h2>Comentários</h2>
                    <div className="comments-list">
                        {comments.map((c, index) => {
                            return (
                                <HelpComment
                                    key={index}
                                    id={c.id}
                                    comment_text={c.comment}
                                    pub_datetime={c.localDateTime}
                                    likes={c.voterHashLike ? c.voterHashLike.length : 0}
                                />
                            );
                        })}
                    </div>
                </section>

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

            </main>
        </>
    );
};

export default Faq;
