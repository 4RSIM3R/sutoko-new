<?php

namespace App\Providers;

use App\Contract\Backoffice\PractionerContract;
use App\Contract\BaseContract;
use App\Service\Backoffice\PractionerService;
use App\Service\BaseService;
use Illuminate\Support\ServiceProvider;

class ContractServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        /**
         * Base Service Contract.
         */
        $this->app->bind(BaseContract::class, BaseService::class);

        /**
         * Backoffice Service Contract.
         */
        $this->app->bind(PractionerContract::class, PractionerService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
