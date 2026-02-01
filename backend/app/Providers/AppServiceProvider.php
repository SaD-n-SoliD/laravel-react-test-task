<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		//
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		// Разрешаем CORS для всех запросов к API
		Http::macro('cors', function () {
			return [
				'Access-Control-Allow-Origin' => '*',
				'Access-Control-Allow-Methods' => 'GET, POST, PUT, DELETE, OPTIONS',
				'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
				'Access-Control-Max-Age' => 86400,
			];
		});
	}
}
