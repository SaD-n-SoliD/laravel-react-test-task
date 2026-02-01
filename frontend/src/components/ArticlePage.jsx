import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ArticlePage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [article, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/articles/${id}`);
				setArticle(response.data);
				setLoading(false);
			} catch (err) {
				setError('Ошибка загрузки статьи');
				setLoading(false);
			}
		};

		fetchArticle();
	}, [id]);

	const handleDelete = async () => {
		if (window.confirm('Вы уверены, что хотите удалить эту статью?')) {
			try {
				await axios.delete(`${API_BASE_URL}/articles/${id}`);
				navigate('/');
			} catch (err) {
				setError('Ошибка при удалении статьи');
			}
		}
	};

	if (loading) return <div>Загрузка статьи...</div>;
	if (error) return <div>{error}</div>;
	if (!article) return <div>Статья не найдена</div>;

	return (
		<div>
			<div style={{ marginBottom: '1rem' }}>
				<button onClick={() => navigate(-1)} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem' }}>
					Назад
				</button>
				<button
					onClick={() => navigate(`/edit/${id}`)}
					style={{
						padding: '0.5rem 1rem',
						marginRight: '0.5rem',
						backgroundColor: '#ffc107',
						color: '#212529',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					Редактировать
				</button>
				<button
					onClick={handleDelete}
					style={{
						padding: '0.5rem 1rem',
						backgroundColor: '#dc3545',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					Удалить
				</button>
			</div>

			<article>
				<h1>{article.title}</h1>
				<p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
					{new Date(article.created_at).toLocaleDateString('ru-RU')}
				</p>
				<div dangerouslySetInnerHTML={{ __html: article.content }} />
			</article>

			<section style={{ marginTop: '3rem' }}>
				<h2>Комментарии</h2>
				<CommentForm articleId={article.id} />
				<CommentList comments={article.comments || []} />
			</section>
		</div>
	);
};

export default ArticlePage;