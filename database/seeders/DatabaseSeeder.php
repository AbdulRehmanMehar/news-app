<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed Authors
        $path = 'app/sql-files/new_authors_202304182241.sql';
        DB::unprepared(file_get_contents($path));

        // Seed Sources
        $path = 'app/sql-files/new_sources_202304182243.sql';
        DB::unprepared(file_get_contents($path));

        // Seed News
        $path = 'app/sql-files/new_news_202304182244.sql';
        DB::unprepared(file_get_contents($path));

        // Seed News Authors
        $path = 'app/sql-files/new_news_authors_202304182243.sql';
        DB::unprepared(file_get_contents($path));

        // Seed News Sources
        $path = 'app/sql-files/new_news_sources_202304182242.sql';
        DB::unprepared(file_get_contents($path));

        $this->command->info('Data populated.');
    }
}
