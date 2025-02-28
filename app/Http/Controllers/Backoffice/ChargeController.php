<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\ChargeContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChargeRequest;
use App\Models\Charge;
use App\Models\ChargeHasAssurance;
use App\Models\Assurance;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChargeController extends Controller
{

    protected ChargeContract $service;

    public function __construct(ChargeContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/charge/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name'], ['name'], true);
        return response()->json($data);
    }

    public function create()
    {
        $assurance = Assurance::query()->get(['id', 'name']);
        return Inertia::render('backoffice/master/charge/form', ['assurance' => $assurance]);
    }

    public function store(ChargeRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->create($payload);
        return WebResponse::response($data, 'backoffice.charge.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/charge/form', ["charge" => $data]);
    }

    public function update($id, ChargeRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->update($id, $payload);
        return WebResponse::response($data, 'backoffice.charge.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::response($data, 'backoffice.patient.index');
    }
}
