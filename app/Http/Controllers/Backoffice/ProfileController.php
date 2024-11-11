<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('backoffice/setting/profile/index');
    }

    public function update() {}
}
