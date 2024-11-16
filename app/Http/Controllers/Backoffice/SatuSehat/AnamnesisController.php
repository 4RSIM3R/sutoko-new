<?php

namespace App\Http\Controllers\Backoffice\SatuSehat;

use App\Http\Controllers\Controller;
use App\Http\Requests\SatuSehat\AllergyRequest;
use App\Http\Requests\SatuSehat\ComplaintRequest;
use App\Http\Requests\SatuSehat\FamilyHistoryRequest;
use App\Http\Requests\SatuSehat\MedicalHistoryRequest;
use App\Models\Allergy;
use App\Models\Anamnesis;
use App\Models\Encounter;
use App\Models\FamilyHistory;
use App\Models\MedicalHistory;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatComplaint;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnamnesisController extends Controller
{
    public function anamnesis_form($id)
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

    public function medical_form($id)
    {
        $medical_history = MedicalHistory::query()->where('encounter_id', $id)->get();
        return response()->json($medical_history);
    }

    public function medical_store($id, MedicalHistoryRequest $request)
    {
        $payload = $request->validated();

        try {
            DB::beginTransaction();

            $token = SatuSehatAuth::token();

            

            return Inertia::location(route('backoffice.encounter.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function family_form($id)
    {
        $family_history = FamilyHistory::query()->where('encounter_id', $id)->get();
        return response()->json($family_history);
    }

    public function family_store($id, FamilyHistoryRequest $request)
    {
        $payload = $request->validated();
    }

    public function allergy_form($id)
    {
        $allergy = Allergy::query()->where('encounter_id', $id)->get();
        return response()->json($allergy);
    }

    public function allergy_store($id, AllergyRequest $request)
    {
        $payload = $request->validated();
    }
}
