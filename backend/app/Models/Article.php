<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
	use HasFactory;

	protected $fillable = [
		'title',
		'content',
	];

	protected $casts = [
		'created_at' => 'datetime',
		'updated_at' => 'datetime',
	];

	protected $appends = ['excerpt'];

	public function comments()
	{
		return $this->hasMany(Comment::class);
	}

	/**
	 * Получить краткое описание статьи
	 *
	 * @return string
	 */
	public function getExcerptAttribute()
	{
		$content = trim(strip_tags($this->content));
		$excerpt = mb_strlen($content, 'UTF-8') > 200 ? mb_substr($content, 0, 200, 'UTF-8') . '...' : $content;

		return $excerpt;
	}
}
