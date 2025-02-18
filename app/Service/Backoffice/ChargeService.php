<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\ChargeContract;
use App\Models\Charge;
use App\Models\ChargeHasAssurance;
use App\Service\BaseService;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public function create($payloads)
    {

        $charges = $payloads["charges"];
        unset($payloads["charges"]);

        try {
            if (!is_null($this->guardForeignKey)) {
                $payloads[$this->guardForeignKey] = $this->userID();
            }

            DB::beginTransaction();

            $model = $this->model->create($payloads);

            $data = [];

            foreach ($charges['charges'] as $charge) {
                $price = [
                    "name" => $payloads['name'],
                    "charge_id" => $model->id,
                    "payment_assurance_id" => $charge['payment_assurance_id'],
                    "price" => $charge['price'],
                ];

                $data[] = $price;
            }

            ChargeHasAssurance::query()->insert($data);

            DB::commit();

            return $model->fresh();
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
}
