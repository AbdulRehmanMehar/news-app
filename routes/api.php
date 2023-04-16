<?php

use App\Utils\Seeders\News\Kernel as NewsSeeder;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Utils\Crawlers\News\Kernel as News;
use App\Utils\Crawlers\News\NewsAPI;
use App\Utils\Crawlers\News\TheGuardian;
use App\Utils\Crawlers\News\NyTimes;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->prefix('/auth')->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');

    Route::middleware('auth:sanctum')->get('/logout', 'logout');
});

Route::middleware('auth:sanctum')
    ->controller(PreferenceController::class)
    ->prefix('/user-preferences')
    ->group(function () {

    Route::get('/', 'show');
});

Route::prefix('/realtime/news')->group(function () {
    Route::get('/', function () {
        $news = new NewsSeeder();

        return response($news->seed());
    });

    Route::get('/newsapi', function () {
        $newsAPI = new NewsAPI();
        return response($newsAPI->fetch());
    });

    Route::get('/nytimes', function () {
        $newsAPI = new NyTimes();
        return response($newsAPI->fetch());
    });

    Route::get('/guardian', function () {
        $newsAPI = new TheGuardian();
        return response($newsAPI->fetch());
    });
});
