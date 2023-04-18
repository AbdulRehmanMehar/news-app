<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Author;
use App\Models\Source;
use Illuminate\Http\Request;

class MetaController extends Controller
{
    public function getAuthors(Request $request) {
        $authors = Author::all();
        return response($authors, 200);
    }

    public function getSources(Request $request) {
        $sources = Source::all();
        return response($sources, 200);
    }

    public function getAllMeta(Request $request) {
        $sources = Source::all();
        $authors = Author::all();
        $minDate = News::whereNotNull('publishedAt')->min('publishedAt');
        $maxDate = News::whereNotNull('publishedAt')->max('publishedAt');

        return response([
            "sources" => $sources,
            "authors" => $authors,
            "publishedAt" => [
                "min" => $minDate,
                "max" => $maxDate
            ]
        ], 200);
    }
}
