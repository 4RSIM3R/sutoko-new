<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\MedicineContract;
use App\Models\Medicine;
use App\Service\BaseService;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class MedicineService extends BaseService implements MedicineContract
{

    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Medicine $model)
    {
        $this->model = $model;
    }

    public function create($payloads)
    {
        $data = [
            "name" => $payloads["name"],
            "trademark" => $payloads["nama_dagang"],
            "kfa_code" => $payloads["kfa_code"],
            "manufacturer" => $payloads["manufacturer"],
            "unit_of_meassurement" => $payloads["uom"]["name"],
            "payload" => json_encode($payloads),
        ];

        try {
            DB::beginTransaction();
            $model = $this->model->create($data);
            DB::commit();
            return $model->fresh();
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
}
