<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\EncounterContract;
use App\Models\Encounter;
use App\Models\Location;
use App\Service\BaseService;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatEncounter;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class EncounterService extends BaseService implements EncounterContract
{
    protected Model $model;
    protected array $relation = [];

    /**
     * Repositories constructor.
     *
     * @param Model $model
     */
    public function __construct(Encounter $model)
    {
        $this->model = $model;
    }

    public function create($payloads)
    {

        $payloads["satu_sehat_id"] = (string) Str::uuid();

        $encounter = new SatuSehatEncounter();
        $compose = $encounter->compose_arrived($payloads);

        $location = Location::query()->where('id', $payloads["location_id"])->first();

        try {

            DB::beginTransaction();

            $token = SatuSehatAuth::token();

            $satu_sehat_id =  $encounter->create($token, $compose);

            $payloads["status"] = "arrived";
            $payloads["satu_sehat_id"] = $satu_sehat_id;

            $encounter = Encounter::query()->create($payloads);

            $encounter->bills()->create([
                'type' => 'location_fee',
                'desc' => sprintf("Fee %s", $location->name),
                'amount' => $location->administration_fee,
            ]);

            DB::commit();
            return $encounter;
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }
}
