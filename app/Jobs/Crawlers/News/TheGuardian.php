<?php

namespace App\Jobs\Crawlers\News;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;


namespace App\Jobs\Crawlers\News;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Utils\Extractors\News\TheGuardian as Extractor;

class TheGuardian
{

    private $client = null;
    private $apiKey = null;
    private $headlinesURL = null;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = config('news.GUARDIAN_APIKEY');
        $this->headlinesURL = 'https://content.guardianapis.com/search';
    }

    public function fetch()
    {
        try {
            $res = $this->client->get(
                "{$this->headlinesURL}?show-tags=contributor&page-size=50&show-fields=all&api-key={$this->apiKey}"
            );
            return Extractor::extract(json_decode($res->getBody(), true));
        } catch (ClientException $e) {
            return [];
        }
    }

}
