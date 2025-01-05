<?php

namespace App\Service\Plugins;

use App\Contract\Plugins\AppointmentContract;
use App\Models\Appointment;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class AppointmentService extends BaseService implements AppointmentContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Appointment $model)
    {
        $this->model = $model;
    }
}
