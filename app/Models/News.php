<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class News extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'title',
        'externalLink',
        'imageURL',
        'description',
        'publishedAt'
    ];


    public function authors()
    {
        return $this->belongsToMany(Author::class, 'news_authors', 'news_id', 'author_id');
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class, 'news_sources', 'news_id', 'source_id');
    }

    public function searchableAs(): string
    {
        return 'news_index';
    }

    public function toSearchableArray(): array
    {
        return $this->toArray();
    }
}
