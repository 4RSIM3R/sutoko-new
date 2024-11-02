<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Response;

class QueueController extends Controller
{
    public function index()
    {
        return Response::json(["message" => "work in progress"]);
    }
}
