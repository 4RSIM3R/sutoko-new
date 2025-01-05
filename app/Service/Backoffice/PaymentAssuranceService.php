<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\PaymentAssuranceContract;
use App\Models\PaymentAssurance;
use App\Service\BaseService;
use Illuminate\Database\Eloquent\Model;

class PaymentAssuranceService extends BaseService implements PaymentAssuranceContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(PaymentAssurance $model)
    {
        $this->model = $model;
    }
}
