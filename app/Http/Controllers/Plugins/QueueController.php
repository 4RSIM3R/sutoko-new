<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Response;

class QueueController extends Controller
{
    public function index()
    {
        return Response::json(["message" => "work in progress"]);
    }
}
