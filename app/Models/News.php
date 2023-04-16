<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'news_authors', 'news_id', 'author_id');
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class, 'news_sources', 'news_id', 'source_id');
    }
}
