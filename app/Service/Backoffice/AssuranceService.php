<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\AssuranceContract;
use App\Models\Assurance;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class AssuranceService extends BaseService implements AssuranceContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Assurance $model)
    {
        $this->model = $model;
    }
}
