<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RegistrationController extends Controller
{
    public function appointment_form()
    {
        return Inertia::render('plugins/appointment/index');
    }

    public function appointment_store() {}

    public function registration_form()
    {
        return Inertia::render('plugins/registration/index');
    }

    public function registration_store() {}
}
