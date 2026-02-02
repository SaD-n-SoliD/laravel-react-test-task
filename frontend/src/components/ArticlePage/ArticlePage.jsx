import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CommentList } from '../CommentList/CommentList';
import { CommentForm } from '../CommentForm/CommentForm';
import { API_BASE_URL } from '../../config/api';
import './ArticlePage.css';

export const ArticlePage = () => {
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
			} catch (err) {
				setError('Ошибка загрузки статьи');
				console.error('Fetch article error:', err);
			} finally {
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
				console.error('Delete article error:', err);
			}
		}
	};

	const handleCommentAdded = (newComment) => {
		// Добавляем новый комментарий напрямую в состояние, без перезагрузки всей статьи
		setArticle(prevArticle => ({
			...prevArticle,
			comments: [...(prevArticle.comments || []), newComment]
		}));
	};

	if (loading) return <div className="loading">Загрузка статьи...</div>;
	if (error) return <div className="error">{error}</div>;
	if (!article) return <div className="no-article">Статья не найдена</div>;

	return (
		<div className="article-page-container">
			<div className="article-actions">
				<button
					onClick={() => navigate(-1)}
					className="btn btn-secondary"
				>
					Назад
				</button>
				<button
					onClick={() => navigate(`/edit/${id}`)}
					className="btn btn-warning"
				>
					Редактировать
				</button>
				<button
					onClick={handleDelete}
					className="btn btn-danger"
				>
					Удалить
				</button>
			</div>

			<article className="article-content">
				<header className="article-header">
					<h1 className="article-title">{article.title}</h1>
					<time
						dateTime={article.created_at}
						className="article-date"
					>
						{new Date(article.created_at).toLocaleDateString('ru-RU')}
					</time>
				</header>
				<div
					className="article-body"
					dangerouslySetInnerHTML={{ __html: article.content }}
				/>
			</article>

			<section className="comments-section">
				<h2 className="comments-title">Комментарии</h2>
				<CommentForm
					articleId={article.id}
					onCommentAdded={handleCommentAdded}
				/>
				<CommentList comments={article.comments || []} />
			</section>
		</div>
	);
};
