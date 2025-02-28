<?php

namespace App\Service\Backoffice;

use App\Contract\Backoffice\LocationContract;
use App\Models\Location;
use App\Service\BaseService;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatLocation;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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

    public function create($payloads)
    {
        
        $payloads["physical_type_name"] = Location::mapCodeToName[$payloads["physical_type_code"]];
        $payloads["satu_sehat_id"] = (string) Str::uuid();

        $client = new SatuSehatLocation();
        $compose = $client->compose($payloads);

        try {
            DB::beginTransaction();
            $token = SatuSehatAuth::token();
            $response = $client->create($token, $compose);

            $payloads["satu_sehat_id"] = $response["id"];
            $payloads["response"] = $response;

            $result = Location::create($payloads);

            DB::commit();

            return $result;
        } catch (Exception $e) {
            DB::rollBack();
            return $e;
        }
    }

}
