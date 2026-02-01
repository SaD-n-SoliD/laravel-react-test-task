import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const CommentForm = ({ articleId }) => {
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
			await axios.post(`${API_BASE_URL}/articles/${articleId}/comments`, {
				author_name: authorName,
				content: content
			});

			// Очищаем форму после успешной отправки
			setAuthorName('');
			setContent('');
		} catch (err) {
			setError('Ошибка при добавлении комментария');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
			<h3>Добавить комментарий</h3>

			{error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

			<div style={{ marginBottom: '1rem' }}>
				<input
					type="text"
					placeholder="Ваше имя"
					value={authorName}
					onChange={(e) => setAuthorName(e.target.value)}
					style={{
						width: '100%',
						padding: '0.5rem',
						border: '1px solid #ccc',
						borderRadius: '4px',
						marginBottom: '0.5rem'
					}}
					disabled={loading}
				/>
				<textarea
					placeholder="Комментарий"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					rows="4"
					style={{
						width: '100%',
						padding: '0.5rem',
						border: '1px solid #ccc',
						borderRadius: '4px'
					}}
					disabled={loading}
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				style={{
					padding: '0.5rem 1rem',
					backgroundColor: '#007bff',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: loading ? 'not-allowed' : 'pointer'
				}}
			>
				{loading ? 'Отправка...' : 'Добавить комментарий'}
			</button>
		</form>
	);
};

export default CommentForm;