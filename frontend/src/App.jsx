import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import ArticleForm from './components/ArticleForm';

function App() {
	return (
		<Router>
			<div className="app">
				<nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
					<Link to="/" style={{ marginRight: '1rem' }}>Главная</Link>
					<Link to="/new" style={{ marginRight: '1rem' }}>Новая статья</Link>
				</nav>

				<main style={{ padding: '1rem' }}>
					<Routes>
						<Route path="/" element={<ArticleList />} />
						<Route path="/articles/:id" element={<ArticlePage />} />
						<Route path="/new" element={<ArticleForm />} />
						<Route path="/edit/:id" element={<ArticleForm />} />
					</Routes>
				</main>
			</div>
		</Router>
	);
}

export default App;