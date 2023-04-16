<?php

namespace App\Jobs;

use App\Utils\Seeders\News\Kernel as NewsSeeder;

class SeedNewsData
{

    private $seeder;

    public function __construct()
    {
        $this->seeder = new NewsSeeder();
    }

    public function __invoke()
    {
        $this->seeder->seed();
    }

}
