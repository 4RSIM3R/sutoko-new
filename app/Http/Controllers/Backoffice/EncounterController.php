<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\EncounterRequest;
use App\Models\Encounter;
use App\Models\Patient;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatEncounter;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EncounterController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->get('page', 1);

        $encounters = Encounter::query()->with(['patient', 'location', 'practioner'])->paginate(page: $page);

        $encounters = [
            "prev_page" => $encounters->currentPage() > 1 ? $encounters->currentPage() - 1 : null,
            "items" => $encounters->items(),
            "next_page" => $encounters->hasMorePages() ? $encounters->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/operational/encounter/index', [
            'encounters' => $encounters,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/operational/encounter/form');
    }

    public function store(EncounterRequest $request)
    {
        $payload = $request->validated();
        $payload["satu_sehat_id"] = (string) Str::uuid();

        $encounter = new SatuSehatEncounter();
        $compose = $encounter->compose_arrived($payload);

        try {
            DB::beginTransaction();

            $token = SatuSehatAuth::token();
            $encounter->create($token, $compose);

            $payload["status"] = "arrived";
            Encounter::query()->create($payload);

            DB::commit();
            return Inertia::location(route('backoffice.encounter.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function anamnesis($id)
    {
        return Inertia::render('backoffice/operational/encounter/anamnesis/index', [
            'encounter' => Encounter::find($id),
        ]);
    }

    public function observation($id)
    {
        return Inertia::render('backoffice/operational/encounter/observation/index', [
            'encounter' => Encounter::find($id),
        ]);
    }

    public function diagnose($id)
    {
        return Inertia::render('backoffice/operational/encounter/observation/index', [
            'encounter' => Encounter::find($id),
        ]);
    }

    public function medication($id)
    {
        return Inertia::render('backoffice/operational/encounter/observation/index', [
            'encounter' => Encounter::find($id),
        ]);
    }
}
