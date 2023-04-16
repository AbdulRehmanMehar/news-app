<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    use HasFactory;

    public function news()
    {
        return $this->belongsToMany(
            News::class,
            'news_sources',
            'source_id',
            'news_id'
        );
    }
}
