<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsFeed extends Controller
{
    public function show(Request $request)
    {
        $news = News::paginate(15);

        return response($news, 200);
    }
}