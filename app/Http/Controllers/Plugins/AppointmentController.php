<?php

namespace App\Http\Controllers\Plugins;

use App\Http\Controllers\Controller;
use App\Http\Requests\QueueRequest;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);

        $locations = Schedule::query()->paginate(perPage: 10, page: $page);

        $locations = [
            "prev_page" => $locations->currentPage() > 1 ? $locations->currentPage() - 1 : null,
            "items" => $locations->items(),
            "next_page" => $locations->hasMorePages() ? $locations->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/location/index', ['locations' => $locations]);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/location/index');
    }

    public function store(QueueRequest $request) {}

    public function show($id)
    {
        return Inertia::render('backoffice/master/location/index');
    }

    public function update($id, QueueRequest $request) {}

    public function destroy($id) {}
}
