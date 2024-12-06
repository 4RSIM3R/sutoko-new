<?php

namespace App\Http\Controllers\Backoffice\SatuSehat;

use App\Http\Controllers\Controller;
use App\Http\Requests\SatuSehat\PsychologicalRequest;
use App\Http\Requests\SatuSehat\VitalSignRequest;
use App\Models\Psychological;
use App\Models\VitalSign;
use Exception;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ObservationController extends Controller
{
    public function ttv_form($id)
    {
        $result = VitalSign::query()->where('encounter_id', $id)->first();
        return response()->json($result);
    }

    public function ttv_store($id, VitalSignRequest $request)
    {
        $payload = $request->validated();
        $payload["satu_sehat_id"] = "-";
        $payload["encounter_id"] = $id;
        try {
            DB::beginTransaction();
            VitalSign::query()->create($payload);
            DB::commit();
            return Inertia::location(route('backoffice.encounter.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function psychological_form($id)
    {
        $result = Psychological::query()->where('encounter_id', $id)->first();
        return response()->json($result);
    }

    public function psychological_store($id, PsychologicalRequest $request)
    {
        $payload = $request->validated();
    }

    public function htt_form($id) {}

    public function htt_store($id) {}

    public function summary_form($id) {}

    public function summary_store($id) {}
}
