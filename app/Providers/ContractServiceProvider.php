<?php

namespace App\Providers;

use App\Contract\Backoffice\ChargeContract;
use App\Contract\Backoffice\LocationContract;
use App\Contract\Backoffice\MedicineContract;
use App\Contract\Backoffice\PatientContract;
use App\Contract\Backoffice\AssuranceContract;
use App\Contract\Backoffice\EncounterContract;
use App\Contract\Backoffice\PractionerContract;
use App\Contract\BaseContract;
use App\Contract\Plugins\AppointmentContract;
use App\Contract\Plugins\ScheduleContract;
use App\Service\Backoffice\ChargeService;
use App\Service\Backoffice\LocationService;
use App\Service\Backoffice\MedicineService;
use App\Service\Backoffice\PatientService;
use App\Service\Backoffice\AssuranceService;
use App\Service\Backoffice\EncounterService;
use App\Service\Backoffice\PractionerService;
use App\Service\BaseService;
use App\Service\Plugins\AppointmentService;
use App\Service\Plugins\ScheduleService;
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
        $this->app->bind(AssuranceContract::class, AssuranceService::class);
        $this->app->bind(LocationContract::class, LocationService::class);
        $this->app->bind(EncounterContract::class, EncounterService::class);

        /**
         * Plugin Service Contract.
         */
        $this->app->bind(AppointmentContract::class, AppointmentService::class);
        $this->app->bind(ScheduleContract::class, ScheduleService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
