import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import './ArticleForm.css';

export const ArticleForm = () => {
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
					console.error('Fetch article error:', err);
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
			console.error('Submit article error:', err);
		} finally {
			setLoading(false);
		}
	};

	const formTitle = isEdit ? 'Редактировать статью' : 'Новая статья';
	const submitButtonText = isEdit ? (loading ? 'Обновление...' : 'Обновить статью') : (loading ? 'Создание...' : 'Создать статью');
	const submitButtonColor = isEdit ? '#ffc107' : '#28a745';

	return (
		<div className="article-form-container">
			<h1 className="form-title">{formTitle}</h1>

			{error && <div className="error-message">{error}</div>}

			<form onSubmit={handleSubmit} className="article-form">
				<div className="form-group">
					<input
						type="text"
						placeholder="Заголовок статьи"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="form-input"
						disabled={loading}
					/>

					<textarea
						placeholder="Содержание статьи"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						rows="10"
						className="form-textarea"
						disabled={loading}
					/>
				</div>

				<div className="form-actions">
					<button
						type="submit"
						disabled={loading}
						style={{ backgroundColor: submitButtonColor }}
						className="btn btn-primary"
					>
						{submitButtonText}
					</button>

					<button
						type="button"
						onClick={() => navigate(-1)}
						className="btn btn-secondary"
					>
						Отмена
					</button>
				</div>
			</form>
		</div>
	);
};

