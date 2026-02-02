<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Article;
use Illuminate\Http\Request;

class CommentController extends Controller
{
	public function store(Request $request, $articleId)
	{
		$validatedData = $request->validate([
			'author_name' => 'required|string|max:255',
			'content' => 'required|string'
		]);

		$article = Article::findOrFail($articleId);

		$comment = $article->comments()->create([
			'author_name' => $validatedData['author_name'],
			'content' => $validatedData['content']
		]);

		// Возвращаем только созданный комментарий
		return response()->json($comment, 201, [], JSON_UNESCAPED_UNICODE);
	}
}
