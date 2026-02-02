import { API_BASE_URL } from '../../config/api';
import './CommentList.css';

export const CommentList = ({ comments }) => {
	if (!comments || comments.length === 0) {
		return <p className="no-comments">Комментариев пока нет</p>;
	}

	return (
		<div className="comment-list">
			{comments.map(comment => (
				<article key={comment.id} className="comment-item">
					<header className="comment-header">
						<h4 className="comment-author">{comment.author_name}</h4>
						<time
							dateTime={comment.created_at}
							className="comment-date"
						>
							{new Date(comment.created_at).toLocaleDateString('ru-RU')}{' '}
							{new Date(comment.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
						</time>
					</header>
					<div className="comment-content">
						{comment.content}
					</div>
				</article>
			))}
		</div>
	);
};
