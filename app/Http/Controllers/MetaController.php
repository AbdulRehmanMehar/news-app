<?php

namespace App\Http\Controllers;

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
        $authors = Source::all();
        return response($authors, 200);
    }
}
