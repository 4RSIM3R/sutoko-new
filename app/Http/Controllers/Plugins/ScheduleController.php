<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    public function index()
    {
        return Inertia::render('plugins/schedule/index');
    }
}
