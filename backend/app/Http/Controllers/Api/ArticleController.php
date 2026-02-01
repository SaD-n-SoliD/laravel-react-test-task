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
		$articles = Article::select('id', 'title', 'created_at')
			->orderBy('created_at', 'desc')
			->get()
			->map(function ($article) {
				$article->excerpt = strlen($article->content) > 200 ? substr($article->content, 0, 200) . '...' : $article->content;
				return $article;
			});

		return response()->json($articles);
	}

	public function show($id)
	{
		$article = Article::with('comments')->findOrFail($id);

		$article->excerpt = strlen($article->content) > 200 ? substr($article->content, 0, 200) . '...' : $article->content;

		return response()->json($article);
	}

	public function store(Request $request)
	{
		$validatedData = $request->validate([
			'title' => 'required|string|max:255',
			'content' => 'required|string'
		]);

		$article = Article::create($validatedData);

		return response()->json($article, 201);
	}

	public function update(Request $request, $id)
	{
		$article = Article::findOrFail($id);
		
		$validatedData = $request->validate([
			'title' => 'sometimes|required|string|max:255',
			'content' => 'sometimes|required|string'
		]);

		$article->update($validatedData);

		return response()->json($article);
	}

	public function destroy($id)
	{
		$article = Article::findOrFail($id);
		$article->delete();

		return response()->json(['message' => 'Статья успешно удалена']);
	}
}
