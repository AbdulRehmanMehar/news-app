<?php

namespace App\Jobs\Crawlers\News;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;


namespace App\Jobs\Crawlers\News;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

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
            $res = $this->client->get("{$this->headlinesURL}?api-key={$this->apiKey}");
            return json_decode($res->getBody(), true);
        } catch (ClientException $e) {
            return [];
        }
    }

}
