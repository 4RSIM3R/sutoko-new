<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChargeRequest;
use App\Models\Charge;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChargeController extends Controller
{
    public function index(Request  $request)
    {
        $page = $request->get('page', 1);

        $charges = Charge::query()->paginate(perPage: 10, page: $page);

        $charges = [
            "prev_page" => $charges->currentPage() > 1 ? $charges->currentPage() - 1 : null,
            "items" => $charges->items(),
            "next_page" => $charges->hasMorePages() ? $charges->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/charge/index', [
            "charges" => $charges,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/charge/form');
    }

    public function store(ChargeRequest $request)
    {
        $payload = $request->validated();
    }

    public function show($id) {}

    public function update($id, ChargeRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy($id) {}
}
