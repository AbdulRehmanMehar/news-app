<?php

namespace App\Utils\Crawlers\News;

class Kernel
{

    private $newsApi;
    private $nyTimes;
    private $guardian;

    public function __construct()
    {
        $this->newsApi = new NewsAPI();
        $this->nyTimes = new NyTimes();
        $this->guardian = new TheGuardian();
    }


    public function fetch()
    {
        return [...$this->newsApi->fetch(), ...$this->nyTimes->fetch(), ...$this->guardian->fetch()];
    }
}
