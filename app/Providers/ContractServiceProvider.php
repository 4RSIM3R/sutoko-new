<?php

namespace App\Providers;

use App\Contract\Backoffice\ChargeContract;
use App\Contract\Backoffice\LocationContract;
use App\Contract\Backoffice\MedicineContract;
use App\Contract\Backoffice\PatientContract;
use App\Contract\Backoffice\PaymentAssuranceContract;
use App\Contract\Backoffice\PractionerContract;
use App\Contract\BaseContract;
use App\Service\Backoffice\ChargeService;
use App\Service\Backoffice\LocationService;
use App\Service\Backoffice\MedicineService;
use App\Service\Backoffice\PatientService;
use App\Service\Backoffice\PaymentAssuranceService;
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
        $this->app->bind(PatientContract::class, PatientService::class);
        $this->app->bind(MedicineContract::class, MedicineService::class);
        $this->app->bind(ChargeContract::class, ChargeService::class);
        $this->app->bind(PaymentAssuranceContract::class, PaymentAssuranceService::class);
        $this->app->bind(LocationContract::class, LocationService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
