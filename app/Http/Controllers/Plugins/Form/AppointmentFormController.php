<?php

namespace App\Http\Controllers\Plugins\Form;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use Inertia\Inertia;

class AppointmentFormController extends Controller
{
    public function form()
    {
        return Inertia::render('plugins/appointment/form');
    }

    public function store(AppointmentRequest $request)
    {
        return view('plugins.appointment.index');
    }
}
