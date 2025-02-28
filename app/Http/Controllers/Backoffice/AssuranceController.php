<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\AssuranceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\AssuranceRequest;
use App\Models\Assurance;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AssuranceController extends Controller
{

    protected AssuranceContract $service;

    public function __construct(AssuranceContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/assurance/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name'], ['name'], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/assurance/form');
    }

    public function store(AssuranceRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->create($payload);
        return WebResponse::inertia($data, 'backoffice.assurance.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/assurance/form', ["assurance" => $data]);
    }

    public function update($id, AssuranceRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->update($id, $payload);
        return WebResponse::inertia($data, 'backoffice.assurance.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::inertia($data, 'backoffice.assurance.index');
    }
}
