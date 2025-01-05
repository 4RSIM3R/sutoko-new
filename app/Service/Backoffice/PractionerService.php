<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\PractionerContract;
use App\Models\Practioner;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class PractionerService extends BaseService implements PractionerContract
{

    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Practioner $model)
    {
        $this->model = $model;
    }
}
