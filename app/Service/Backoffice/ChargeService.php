<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\ChargeContract;
use App\Models\Charge;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class ChargeService extends BaseService implements ChargeContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Charge $model)
    {
        $this->model = $model;
    }
}
