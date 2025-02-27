<?php

namespace App\Http\Controllers\Plugins\Form;

use App\Contract\Backoffice\PatientContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Utils\WebResponse;
use Inertia\Inertia;

class RegistrationFormController extends Controller
{

    protected PatientContract $service;

    public function __construct(PatientContract $service)
    {
        $this->service = $service;
    }

    public function form()
    {
        return Inertia::render('plugins/registration/form');
    }

    public function store(RegistrationRequest $request)
    {
        $payload = $request->validated();
        $payload['source'] = 'plugin';

        $result = $this->service->create($payload);

        return WebResponse::inertia($result, 'home');
    }
}
