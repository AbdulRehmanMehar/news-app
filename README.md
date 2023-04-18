## News App

Fetches data from

-   NewYork Times
-   The Guardian
-   NewsAPI

### How to run?

-   Rename `.env.example` to `.env`.
-   Open Terminal and type `./vendor/bin/sail up`. Backend will be accessible at `http://localhost:8000` and Frontend at `http://localhost:3000`
-   Run the migrations `./vendor/bin/sail artisan migrate`
-   Run the seeder `./vendor/bin/sail artisan db:seed`
-   Run the Scheduled Job to fetch news `./vendor/bin/sail artisan schedule:work`
