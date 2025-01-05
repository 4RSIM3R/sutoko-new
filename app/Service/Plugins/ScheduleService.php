<?php

namespace App\Service\Plugins;

use App\Contract\Plugins\ScheduleContract;
use App\Models\Schedule;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class ScheduleService extends BaseService implements ScheduleContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Schedule $model)
    {
        $this->model = $model;
    }
}
