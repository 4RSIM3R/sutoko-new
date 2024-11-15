<?php

namespace App\Http\Controllers\Backoffice\SatuSehat;

use App\Http\Controllers\Controller;
use App\Http\Requests\SatuSehat\ComplaintRequest;
use App\Models\Anamnesis;
use App\Models\Encounter;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatComplaint;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnamnesisController extends Controller
{
    public function anamnesis_form($id, Request $request)
    {
        $anamnesis = Anamnesis::query()->where('encounter_id', $id)->first();
        return response()->json($anamnesis);
    }

    public function anamnesis_store($id, ComplaintRequest $request)
    {
        $encounter = Encounter::query()->with(['patient', 'practioner'])->find($id);
        $payload = $request->validated();

        $payload["encounter_id"] = $encounter->id;

        $client = new SatuSehatComplaint();

        $primary = $client->compose_primary([
            "primary_code" => $payload["primary_code"],
            "primary_display" => $payload["primary_display"],
            "patient_id" => $encounter->patient->satu_sehat_id,
            "patient_name" => $encounter->patient->name,
            "encounter_id" => $encounter->satu_sehat_id,
            "practioner_id" => $encounter->practioner->satu_sehat_id,
            "practioner_name" => $encounter->practioner->name,
            "notes" => $payload["notes"],
        ]);

        $secondary = null;

        if ($request["secondary_code"] != null) {
            $secondary = $client->compose_secondary([
                "secondary_code" => $payload["secondary_code"],
                "secondary_display" => $payload["secondary_display"],
                "patient_id" => $encounter->patient->satu_sehat_id,
                "patient_name" => $encounter->patient->name,
                "encounter_id" => $encounter->satu_sehat_id,
                "practioner_id" => $encounter->practioner->satu_sehat_id,
                "practioner_name" => $encounter->practioner->name,
                "notes" => $payload["notes"],
            ]);
        }

        try {
            DB::beginTransaction();

            $token = SatuSehatAuth::token();

            $primary = $client->create($token, $primary);
            $payload["primary_satu_sehat_id"] = $primary;

            if ($payload["secondary_code"] !=  null) {
                $secondary = $client->create($token, $secondary);
                $payload["secondary_satu_sehat_id"] = $primary;
            }

            Anamnesis::query()->create($payload);

            DB::commit();
            return Inertia::location(route('backoffice.encounter.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }
}
