<?php

namespace App\Http\Controllers\Backoffice\SatuSehat;

use App\Http\Controllers\Controller;
use App\Http\Requests\SatuSehat\ComplaintRequest;
use App\Models\Anamnesis;
use App\Models\Encounter;
use Exception;
use Illuminate\Http\Request;

class AnamnesisController extends Controller
{
    public function complaint_form($id, Request $request)
    {
        $type = $request->get('type', 'chief');
        $anamnesis = Anamnesis::query()->where('encounter_id', $id)->where('type', $type)->first();
        return response()->json($anamnesis);
    }

    public function complaint_store($id, ComplaintRequest $request)
    {
        $encounter = Encounter::find($id);
        $payload = $request->validated();

        $payload["encounter_id"] = $encounter->id;

        try {
            //code...
        } catch (Exception $exception) {
            //throw $th;
        }

    }
}
