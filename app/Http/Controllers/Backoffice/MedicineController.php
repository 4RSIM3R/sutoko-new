<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\MedicineContract;
use App\Http\Controllers\Controller;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\WebResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MedicineController extends Controller
{

    protected MedicineContract $service;

    public function __construct(MedicineContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/medicine/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name', 'kfa_code', 'trademark'], ['name', 'trademark'], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/medicine/form');
    }

    public function store(Request $request)
    {
        $payload = $request->all();
        $data = $this->service->create($payload);
        return WebResponse::inertia($data, 'backoffice.medicine.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/medicine/detail', ["medicine" => $data]);
    }

    public function update($id, Request $request)
    {
        $payload = $request->all();
        $data = $this->service->update($id, $payload);
        return WebResponse::inertia($data, 'backoffice.medicine.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::inertia($data, 'backoffice.medicine.index');
    }
}
