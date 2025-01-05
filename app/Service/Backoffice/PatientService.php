<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\PatientContract;
use App\Models\Patient;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class PatientService extends BaseService implements PatientContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Patient $model)
    {
        $this->model = $model;
    }
}
