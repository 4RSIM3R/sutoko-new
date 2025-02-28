<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\EncounterContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\EncounterRequest;
use App\Models\Encounter;
use App\Models\Patient;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatEncounter;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EncounterController extends Controller
{
    
    protected EncounterContract $service;

    public function __construct(EncounterContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/operational/encounter/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name'], ['name'], true, relation: ['patient', 'location', 'practioner', 'bills']);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/operational/encounter/form');
    }

    public function store(EncounterRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->create($payload);
        return WebResponse::response($data, 'backoffice.encounter.index');
    }

    public function anamnesis($id)
    {
        return Inertia::render('backoffice/operational/encounter/anamnesis/index', [
            'encounter' => Encounter::query()->with(['patient', 'practioner'])->find($id),
        ]);
    }

    public function observation($id)
    {
        return Inertia::render('backoffice/operational/encounter/observation/index', [
            'encounter' => Encounter::query()->with(['patient', 'practioner'])->find($id),
        ]);
    }

    public function diagnose($id)
    {
        return Inertia::render('backoffice/operational/encounter/condition/index', [
            'encounter' => Encounter::query()->with(['patient', 'practioner'])->find($id),
        ]);
    }
}
