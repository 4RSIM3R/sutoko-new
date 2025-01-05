<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\PatientContract;
use App\Models\Patient;
use App\Service\BaseService;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPractioner;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PatientService extends BaseService implements PatientContract
{
    protected Model $model;
    protected array $relation = [];
    protected array $fileKeys = ['str', 'sip'];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Patient $model)
    {
        $this->model = $model;
    }

    /**
     * Create new item to resource.
     *
     * @param $payloads
     * @return Exception|true
     */
    public function create($payloads)
    {
        try {


            DB::beginTransaction();

            $token = SatuSehatAuth::token();
            $ihs = SatuSehatPractioner::get_ihs($token, $payloads['nik']);

            $payloads['satu_sehat_id'] = $ihs;

            $model = $this->model->create($payloads);

            foreach ($this->fileKeys as $fileKey) {
                $model->addMultipleMediaFromRequest([$fileKey])
                    ->each(function ($image) use ($fileKey) {
                        $image->toMediaCollection($fileKey);
                    });
            }

            DB::commit();

            return $model->fresh();
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
}
