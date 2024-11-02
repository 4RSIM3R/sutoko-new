<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class BackofficeController extends Controller
{
    public function index()
    {
        return Inertia::render('backoffice/backoffice');
    }
}
