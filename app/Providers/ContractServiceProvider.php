<?php

namespace App\Providers;

use App\Contract\BaseContract;
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
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
