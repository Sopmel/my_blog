export default function Post({ post }) {
    const createdAtDate = new Date(post.createdAt);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'Europe/Stockholm'
    };
    const formattedDate = createdAtDate.toLocaleDateString('sv-SE', options);
    return (
        <div className="post">
            <div className="image">
                <img src="https://media.istockphoto.com/photos/retro-blog-bookshelf-with-cozy-interior-picture-id1146554418?b=1&k=20&m=1146554418&s=170667a&w=0&h=OKcK6RlNkwYU4y1xba-hEcXM3IA7itp2pYKDGDT6KAI=" />
            </div>

            <div className="texts">
                <h2>{post.title}</h2>
                <p className="info">
                    <a className="author">Sophie Melin</a>
                    <time>{formattedDate}</time>

                </p>
                <p className="summary">{post.summary}</p>
            </div>
        </div>
    )
}