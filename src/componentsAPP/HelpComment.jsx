const HelpComment = (detalhes) => {

    return(
        <div className="comment">
            <p className="comment-text">{detalhes.comment_text}</p>
            <p className="comment-date">{detalhes.pub_datetime}</p>
            <p className="comment-likes">Likes: {detalhes.likes}</p>
        </div>
    )
}
export default HelpComment;