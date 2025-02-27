<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\PatientContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Models\Patient;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPatient;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;

class PatientController extends Controller
{

    protected PatientContract $service;

    public function __construct(PatientContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/patient/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name', 'nik'], ['name', 'nik'], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/patient/form');
    }

    public function store(PatientRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->create($payload);
        return WebResponse::response($data, 'backoffice.patient.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/patient/detail', ["patient" => $data]);
    }

    public function update($id, PatientRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->update($id, $payload);
        return WebResponse::response($data, 'backoffice.patient.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::response($data, 'backoffice.patient.index');
    }
}
