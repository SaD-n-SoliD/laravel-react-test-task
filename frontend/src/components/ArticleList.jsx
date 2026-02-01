import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const ArticleList = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await axios.get(`${API_BASE_URL}/articles`);
				setArticles(response.data);
				setLoading(false);
			} catch (err) {
				setError('Ошибка загрузки статей');
				setLoading(false);
			}
		};

		fetchArticles();
	}, []);

	if (loading) return <div>Загрузка статей...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Блог</h1>
			<div>
				{articles.map(article => (
					<div key={article.id} style={{ marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #eee' }}>
						<h2>
							<Link to={`/articles/${article.id}`} style={{ textDecoration: 'none', color: '#333' }}>
								{article.title}
							</Link>
						</h2>
						<p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
							{new Date(article.created_at).toLocaleDateString('ru-RU')}
						</p>
						<p dangerouslySetInnerHTML={{ __html: article.excerpt }} />
					</div>
				))}
			</div>
		</div>
	);
};

export default ArticleList;