<?php

namespace App\Jobs\Crawlers\News;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Utils\Extractors\News\NyTimes as Extractor;

class NyTimes
{

    private $client = null;
    private $apiKey = null;
    private $headlinesURL = null;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('news.NYTIMES_APIKEY');
        $this->headlinesURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    }

    public function fetch()
    {
        try {
            $res = $this->client->request('GET', "{$this->headlinesURL}?api-key={$this->apiKey}");
            return Extractor::extract(json_decode($res->getBody(), true));
        } catch (ClientException $e) {
            return [];
        }
    }

}
