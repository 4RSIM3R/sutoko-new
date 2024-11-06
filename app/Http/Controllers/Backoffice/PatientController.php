<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        return Inertia::render('backoffice/master/patient/index');
    }


    public function create()
    {
        return Inertia::render('backoffice/master/patient/form');
    }

    public function store(PatientRequest $request)
    {

        $payload = $request->validated();
    }

    public function show(string $id)
    {
        //
    }

    public function update(string $id, PatientRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy(string $id)
    {
        //
    }
}
