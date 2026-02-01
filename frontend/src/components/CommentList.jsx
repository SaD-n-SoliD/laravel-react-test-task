import React from 'react';

const CommentList = ({ comments }) => {
	if (!comments || comments.length === 0) {
		return <p>Комментариев пока нет</p>;
	}

	return (
		<div style={{ marginTop: '1.5rem' }}>
			{comments.map(comment => (
				<div key={comment.id} style={{
					marginBottom: '1rem',
					paddingBottom: '1rem',
					borderBottom: '1px solid #eee'
				}}>
					<h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{comment.author_name}</h4>
					<p style={{ margin: 0 }}>{comment.content}</p>
					<small style={{ color: '#999', fontSize: '0.8rem' }}>
						{new Date(comment.created_at).toLocaleDateString('ru-RU')} {new Date(comment.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
					</small>
				</div>
			))}
		</div>
	);
};

export default CommentList;