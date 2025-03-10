<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\PractionerContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\PractionerRequest;
use App\Models\Practioner;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPractioner;
use App\Utils\WebResponse;
use Exception;
use Inertia\Inertia;

class PractionerController extends Controller
{

    protected PractionerContract $service;

    public function __construct(PractionerContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/practioner/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name', 'nik', 'occupation'], [], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/practioner/form');
    }

    public function store(PractionerRequest $request)
    {
        $payload = $request->validated();
        $result = $this->service->create($payload);
        return WebResponse::inertia($result, 'backoffice.practioner.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/practioner/detail', ["practioner" => $data]);
    }

    public function update($id, PractionerRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->update($id, $payload);
        return WebResponse::inertia($data, 'backoffice.practioner.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::inertia($data, 'backoffice.practioner.index');
    }
}
