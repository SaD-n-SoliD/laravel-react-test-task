import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';
import './ArticleList.css';

export const ArticleList = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/articles`);
				setArticles(response.data);
			} catch (err) {
				setError('Ошибка загрузки статей');
				console.error('Fetch articles error:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) return <div className="loading">Загрузка статей...</div>;
	if (error) return <div className="error">{error}</div>;

	return (
		<main className="article-list-container">
			<h1 className="page-title">Блог</h1>
			<div className="articles-grid">
				{articles.length === 0 ? (
					<p className="no-articles">Статей пока нет</p>
				) : (
					articles.map(article => (
						<article key={article.id} className="article-card">
							<h2 className="article-title">
								<Link to={`/articles/${article.id}`} className="article-link">
									{article.title}
								</Link>
							</h2>
							<time dateTime={article.created_at} className="article-date">
								{new Date(article.created_at).toLocaleDateString('ru-RU')}
							</time>
							<div
								className="article-excerpt"
								dangerouslySetInnerHTML={{ __html: article.excerpt }}
							/>
						</article>
					))
				)}
			</div>
		</main>
	);
};
