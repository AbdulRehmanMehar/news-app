<?php

namespace App\Utils\Extractors\News;

class NyTimes
{
    private static function mapAuthor($author)
    {
        return "{$author['firstname']} {$author['lastname']}";
    }

    private static function mapArticle($article)
    {
        $imageURI = $article['multimedia'] ? reset($article['multimedia'])['url'] : false;
        $imageURI = $imageURI ? "https://www.nytimes.com/{$imageURI}" : null;
        return [
            'title' => $article['headline']['main'],
            'externalLink' => $article['web_url'],
            'imageURL' => $imageURI,
            'description' => $article['lead_paragraph'] ? $article['lead_paragraph'] : $article['snippet'],
            'publishedAt' => $article['pub_date'],
            'source' => $article['source'],
            'authors' => array_map("self::mapAuthor", $article['byline']['person'])
        ];
    }

    public static function extract($jsonResponse)
    {
        $articles = $jsonResponse['response']['docs'];
        $articles = array_map("self::mapArticle", $articles);

        return $articles;
    }

}
