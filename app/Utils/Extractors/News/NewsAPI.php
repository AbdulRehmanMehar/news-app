<?php

namespace App\Utils\Extractors\News;

class NewsAPI
{
    private static function mapArticle($article)
    {
        $newArticle = [
            'title' => $article['title'],
            'externalLink' => $article['url'],
            'imageURL' => $article['urlToImage'],
            'description' => $article['description'],
            'publishedAt' => $article['publishedAt'],
            'source' => $article['source'] ? $article['source']['name'] : null,
            'authors' => []
        ];


        $author = $article['author'];
        if ($author) {
            if (!strpos($author, ',')) {
                $newArticle['authors'] = (array) $article['author'];
            } else {
                $authors = preg_split("/\,/", $author);
                $newArticle['authors'] = $authors;
            }

        }


        return $newArticle;
    }

    public static function extract($jsonResponse)
    {
        $articles = $jsonResponse['articles'];
        $articles = array_map("self::mapArticle", $articles);

        return $articles;
    }

}
