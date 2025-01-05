<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\LocationContract;
use App\Models\Location;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class LocationService extends BaseService implements LocationContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Location $model)
    {
        $this->model = $model;
    }
}
