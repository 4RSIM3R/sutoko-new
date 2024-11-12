<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\EncounterRequest;
use App\Models\Encounter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EncounterController extends Controller
{

    public function index(Request $request)
    {
        $page = $request->get('page', 1);

        $encounters = Encounter::query()->paginate(page: $page);

        $encounters = [
            "prev_page" => $encounters->currentPage() > 1 ? $encounters->currentPage() - 1 : null,
            "items" => $encounters->items(),
            "next_page" => $encounters->hasMorePages() ? $encounters->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/operational/encounter/index', [
            'encounters' => $encounters,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/operational/encounter/form');
    }

    public function store(EncounterRequest $request) {}
}
