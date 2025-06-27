const HelpComment = ({ comment_text, pub_datetime, likes, answer }) => {
    return (
        <div className="comment">
            <p className="comment-text">{comment_text}</p>
            <p><em>{new Date(pub_datetime).toLocaleString()}</em></p>
            <p className="comment-likes">Likes: {likes}</p>
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
