<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;

class ScheduleController extends Controller
{
    public function index()
    {
        return Response::json(["message" => "work in progress"]);
    }
}
