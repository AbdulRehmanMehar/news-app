<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NewsFeed extends Controller
{
    public function show(Request $request)
    {
        $searchQuery = $request->query('search');
        $minDate = $request->query('minDate');
        $maxDate = $request->query('maxDate');
        $authors = $request->query('authors');
        $sources = $request->query('sources');

        $news = News::orderBy('publishedAt', 'DESC');
        $news = $news->with('authors', 'sources');

        if ($searchQuery) {
            $news = $news->where('title', 'like', "%{$searchQuery}%");
            $news = $news->where('description', 'like', "%{$searchQuery}%");
        }

        if ($authors) {
            $authors = rawurldecode($authors);
            $authors = json_decode($authors);
            $news = $news->whereExists(function ($query) use ($authors) {
                $query->select('*')
                    ->from('news_authors')
                    ->whereRaw('news_authors.news_id = news.id')
                    ->whereIn('news_authors.author_id', $authors);
            });
        }

        if ($sources) {
            $sources = rawurldecode($sources);
            $sources = json_decode($sources);
            $news = $news->whereExists(function ($query) use ($sources) {
                $query->select('*')
                    ->from('news_sources')
                    ->whereRaw('news_sources.news_id = news.id')
                    ->whereIn('news_sources.source_id', $sources);
            });
        }


        if ($minDate) {
            $news = $news->where('publishedAt', '>=', $minDate);
        }

        if ($maxDate) {
            $news = $news->where('publishedAt', '<=', $maxDate);
        }

        $news = $news->paginate(15);

        return response($news, 200);
    }
}
