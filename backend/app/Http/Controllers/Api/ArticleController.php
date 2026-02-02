<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ArticleController extends Controller
{
	public function index()
	{
		$articles = Article::select('id', 'title', 'content', 'created_at')
			->orderBy('created_at', 'desc')
			->get()
			->map(function ($article) {
				// Удаляем HTML-теги и очищаем контент для создания excerpt
				$content = trim(strip_tags($article->content));
				// Используем mb_strlen и mb_substr для корректной работы с UTF-8
				$excerpt = mb_strlen($content, 'UTF-8') > 200 ? mb_substr($content, 0, 200, 'UTF-8') . '...' : $content;

				// Создаем новый массив с нужными полями, исключая content
				return [
					'id' => $article->id,
					'title' => $article->title,
					'excerpt' => $excerpt,
					'created_at' => $article->created_at
				];
			});

		return response()->json($articles, 200, [], JSON_UNESCAPED_UNICODE);
	}

	public function show($id)
	{
		$article = Article::with('comments')->findOrFail($id);
		
		$content = trim(strip_tags($article->content));
		$excerpt = mb_strlen($content, 'UTF-8') > 200 ? mb_substr($content, 0, 200, 'UTF-8') . '...' : $content;

		// Преобразуем статью в массив и добавляем excerpt
		$articleData = [
			'id' => $article->id,
			'title' => $article->title,
			'content' => $article->content,
			'created_at' => $article->created_at,
			'comments' => $article->comments,
			'excerpt' => $excerpt
		];

		return response()->json($articleData, 200, [], JSON_UNESCAPED_UNICODE);
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'title' => 'required|string|max:255',
			'content' => 'required|string'
		]);

		$article = Article::create($validatedData);

		return response()->json($article, 201, [], JSON_UNESCAPED_UNICODE);
	}

	public function update(Request $request, $id)
	{
		$article = Article::findOrFail($id);

		$validatedData = $request->validate([
			'title' => 'sometimes|required|string|max:255',
			'content' => 'sometimes|required|string'
		]);

		$article->update($validatedData);

		return response()->json($article, 200, [], JSON_UNESCAPED_UNICODE);
	}

	public function destroy($id)
	{
		$article = Article::findOrFail($id);
		$article->delete();

		return response()->json(['message' => 'Статья успешно удалена'], 200, [], JSON_UNESCAPED_UNICODE);
	}
}
