<?php

namespace App\Jobs\Crawlers\News;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class NewsAPI
{

    private $client = null;
    private $apiKey = null;
    private $headlinesURL = null;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('news.NEWSAPI_APIKEY');
        $this->headlinesURL = 'https://newsapi.org/v2/top-headlines';
    }

    public function fetch()
    {
        try {
            $res = $this->client->request('GET', "{$this->headlinesURL}?country=us&apiKey={$this->apiKey}");
            return $res->getBody();
        } catch (ClientException $e) {
            return [];
        }
    }

}
