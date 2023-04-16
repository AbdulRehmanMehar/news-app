<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];


    public function news()
    {
        return $this->belongsToMany(
            News::class,
            'news_authors',
            'author_id',
            'news_id'
        );
    }

    public function user()
    {
        return $this->belongsToMany(
            User::class,
            'user_authors',
            'author_id',
            'user_id'
        );
    }
}
