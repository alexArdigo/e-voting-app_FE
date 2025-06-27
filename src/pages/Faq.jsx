import Header from "../componentsAPP/Header.jsx";
import {useEffect, useState} from "react";
import api from "../services/api.jsx";

const Faq = () => {

    const [comments, setComments] = useState([]);

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
                                    pub_datetime={c.dateTime}
                                    likes={c.likesCount}
                                />
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h2>Tem mais alguma pergunta? Escreva suas dúvidas abaixo.</h2>
                    <form>

                    </form>
                </section>

            </main>
        </>
    );
};

export default Faq;
