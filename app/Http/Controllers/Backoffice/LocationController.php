<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\LocationContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\Location;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatLocation;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LocationController extends Controller
{

    protected LocationContract $service;

    public function __construct(LocationContract $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        return Inertia::render('backoffice/master/location/index');
    }

    public function fetch(Request $request)
    {
        $data = $this->service->all(['name'], ['name'], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/location/form');
    }

    public function store(LocationRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->create($payload);
        return WebResponse::inertia($data, 'backoffice.location.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/location/form', ["location" => $data]);
    }

    public function update($id, LocationRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->update($id, $payload);
        return WebResponse::inertia($data, 'backoffice.location.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::inertia($data, 'backoffice.location.index');
    }
}
