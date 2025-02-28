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

            DB::beginTransaction();

            $model = $this->model->create($payloads);

            $data = [];

            foreach ($charges as $charge) {

                $data[] = [
                    "charge_id" => $model->id,
                    "assurance_id" => $charge['assurance_id'],
                    "price" => $charge['price'],
                ];
            }

            ChargeHasAssurance::query()->insert($data);

            DB::commit();

            return $model->fresh();
        } catch (Exception $e) {
            dd($e);
            DB::rollBack();
            return $e;
        }
    }
}
