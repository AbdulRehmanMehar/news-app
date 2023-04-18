<?php

namespace App\Utils\Seeders\News;

use App\Models\Author;
use App\Models\Source;
use App\Utils\NormalizeString;
use App\Models\News as NewsArticle;
use App\Utils\Crawlers\News\Kernel as News;


class Kernel
{
    private $news;

    public function __construct()
    {
        $this->news = new News();
    }


    private function mapAuthorRecordID($name)
    {
        $authorRecord = Author::where('name', $name)->first();

        if ($authorRecord) {
            return $authorRecord->id;
        }

        $authorRecord = Author::create([
            'name' => $name
        ]);

        return $authorRecord->id;
    }

    private function seedArticle($article)
    {

        $articleRecord = NewsArticle::where('externalLink', $article['externalLink'])->first();

        if ($articleRecord) { return; }

        $articleRecord = NewsArticle::create([
            ...$article,
            'description' => NormalizeString::removeEmoji($article['description'])
        ]);

        $source = $article['source'];
        $authors = $article['authors'];

        if ($source) {
            $sourceRecord = Source::where('name', $source)->first();

            if (!$sourceRecord) {
                $sourceRecord = Source::create([
                    'name' => $source,
                ]);
            }

            $articleRecord->sources()->attach($sourceRecord->id);
        }

        if ($authors) {
            $authorIds = array_map("self::mapAuthorRecordID", $authors);
            $articleRecord->authors()->attach($authorIds);
        }

        return $articleRecord;
    }

    public function seed()
    {
        $articles = $this->news->fetch();
        $articles = array_map("self::seedArticle", $articles);

        return $articles;
    }
}
