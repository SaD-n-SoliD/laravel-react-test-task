import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ArticleForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const { id } = useParams(); // id может быть undefined для создания новой статьи
	
	const isEdit = !!id; // Определяем режим редактирования

	useEffect(() => {
		if (isEdit) {
			const fetchArticle = async () => {
				try {
					const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
					setTitle(response.data.title);
					setContent(response.data.content);
				} catch (err) {
					setError('Ошибка загрузки статьи');
					console.error(err);
				}
			};

			fetchArticle();
		}
	}, [id, isEdit]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			setError('Пожалуйста, заполните все поля');
			return;
		}

		setLoading(true);
		setError('');

		try {
			let response;
			
			if (isEdit) {
				// Режим редактирования
				response = await axios.put(`${API_BASE_URL}/articles/${id}`, {
					title: title,
					content: content
				});
				navigate(`/articles/${id}`);
			} else {
				// Режим создания
				response = await axios.post(`${API_BASE_URL}/articles`, {
					title: title,
					content: content
				});

				// Перенаправляем на страницу новой статьи
				navigate(`/articles/${response.data.id}`);
			}
		} catch (err) {
			const errorMessage = isEdit ? 'Ошибка при обновлении статьи' : 'Ошибка при создании статьи';
			setError(errorMessage);
			console.error(err);
			setLoading(false);
		}
	};

	const formTitle = isEdit ? 'Редактировать статью' : 'Новая статья';
	const submitButtonText = isEdit ? (loading ? 'Обновление...' : 'Обновить статью') : (loading ? 'Создание...' : 'Создать статью');
	const submitButtonColor = isEdit ? '#ffc107' : '#28a745';

	return (
		<div>
			<h1>{formTitle}</h1>

			{error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: '1rem' }}>
					<input
						type="text"
						placeholder="Заголовок статьи"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						style={{
							width: '100%',
							padding: '0.5rem',
							border: '1px solid #ccc',
							borderRadius: '4px',
							marginBottom: '1rem'
						}}
						disabled={loading}
					/>

					<textarea
						placeholder="Содержание статьи"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						rows="10"
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
						backgroundColor: submitButtonColor,
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: loading ? 'not-allowed' : 'pointer',
						marginRight: '0.5rem'
					}}
				>
					{submitButtonText}
				</button>

				<button
					type="button"
					onClick={() => navigate(-1)}
					style={{
						padding: '0.5rem 1rem',
						backgroundColor: '#6c757d',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					Отмена
				</button>
			</form>
		</div>
	);
};

export default ArticleForm;