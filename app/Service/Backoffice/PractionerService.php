<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\PractionerContract;
use App\Models\Practioner;
use App\Service\BaseService;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPractioner;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public function create($payloads)
    {
        try {
            DB::beginTransaction();

            $token = SatuSehatAuth::token();
            $ihs = SatuSehatPractioner::get_ihs($token, $payloads['nik']);

            $payloads['satu_sehat_id'] = $ihs;

            $model = $this->model->create($payloads);

            DB::commit();
            return $model->fresh();
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
}
