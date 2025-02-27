<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\PatientContract;
use App\Models\Patient;
use App\Service\BaseService;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPatient;
use App\Utils\SatuSehat\SatuSehatPractioner;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PatientService extends BaseService implements PatientContract
{
    protected Model $model;
    protected array $relation = [];

    public function __construct(Patient $model)
    {
        $this->model = $model;
    }

    public function create($payloads)
    {
        try {
            DB::beginTransaction();

            $token = SatuSehatAuth::token();
            $ihs = SatuSehatPatient::get_ihs($token, $payloads['nik']);
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
