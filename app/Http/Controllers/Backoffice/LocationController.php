<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;

class LocationController extends Controller
{
    public function index()
    {
        
    }

    public function create() {


    }

    public function store(LocationRequest $request)
    {
        $payload = $request->validated();
    }

    public function show($id) {}

    public function update($id, LocationRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy($id) {}
}
