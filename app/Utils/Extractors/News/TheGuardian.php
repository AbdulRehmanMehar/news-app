<?php

namespace App\Utils\Extractors\News;

class TheGuardian
{
    private static function mapAuthor($tag)
    {
        if ($tag && $tag['type'] === 'contributor') {
            return $tag['webTitle'];
        }

        return null;
    }

    private static function mapArticle($article)
    {
        return [
            'title' => $article['webTitle'],
            'externalLink' => $article['webUrl'],
            'imageURL' => $article['fields']['thumbnail'],
            'description' => substr($article['fields']['bodyText'], 0, 200),
            'publishedAt' => $article['webPublicationDate'],
            'source' => $article['fields']['publication'],
            'authors' => array_filter(array_map("self::mapAuthor", $article['tags'])),
        ];
    }

    public static function extract($jsonResponse)
    {
        $articles = $jsonResponse['response']['results'];
        $articles = array_map("self::mapArticle", $articles);

        return $articles;
    }

}
