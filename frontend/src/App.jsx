import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ArticleList } from './components/ArticleList/ArticleList';
import { ArticlePage } from './components/ArticlePage/ArticlePage';
import { ArticleForm } from './components/ArticleForm/ArticleForm';
import './App.css';

export default function App() {
	return (
		<Router>
			<div className="app">
				<header className="app-header">
					<nav className="navbar">
						<ul className="nav-links">
							<li><Link to="/">Главная</Link></li>
							<li><Link to="/new">Новая статья</Link></li>
						</ul>
					</nav>
				</header>

				<main className="app-main">
					<div className="container">
						<Routes>
							<Route path="/" element={<ArticleList />} />
							<Route path="/articles/:id" element={<ArticlePage />} />
							<Route path="/new" element={<ArticleForm />} />
							<Route path="/edit/:id" element={<ArticleForm />} />
						</Routes>
					</div>
				</main>
			</div>
		</Router>
	);
}
