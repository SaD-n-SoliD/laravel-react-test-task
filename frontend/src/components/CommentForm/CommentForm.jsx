import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import './CommentForm.css';

export const CommentForm = ({ articleId, onCommentAdded }) => {
	const [authorName, setAuthorName] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!authorName.trim() || !content.trim()) {
			setError('Пожалуйста, заполните все поля');
			return;
		}

		setLoading(true);
		setError('');

		try {
			const response = await axios.post(`${API_BASE_URL}/articles/${articleId}/comments`, {
				author_name: authorName,
				content: content
			});

			// Очищаем форму после успешной отправки
			setAuthorName('');
			setContent('');

			// Вызываем колбэк для обновления списка комментариев
			if (onCommentAdded) {
				onCommentAdded(response.data);
			}
		} catch (err) {
			setError('Ошибка при добавлении комментария');
			console.error('Add comment error:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="comment-form">
			<h3 className="comment-form-title">Добавить комментарий</h3>

			{error && <div className="error-message">{error}</div>}

			<div className="form-group">
				<input
					type="text"
					placeholder="Ваше имя"
					value={authorName}
					onChange={(e) => setAuthorName(e.target.value)}
					className="form-input"
					disabled={loading}
				/>
				<textarea
					placeholder="Комментарий"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows="4"
					className="form-textarea"
					disabled={loading}
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="submit-btn"
			>
				{loading ? 'Отправка...' : 'Добавить комментарий'}
			</button>
		</form>
	);
};
