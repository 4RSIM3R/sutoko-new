<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChargeRequest;
use App\Models\Charge;
use App\Models\PaymentAssurance;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChargeController extends Controller
{
    public function index(Request  $request)
    {
        $page = $request->get('page', 1);

        $charges = Charge::query()->with(['payment_assurance'])->paginate(perPage: 10, page: $page);

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
        $payment = PaymentAssurance::query()->get(['id', 'name']);
        return Inertia::render('backoffice/master/charge/form', ["payment" => $payment]);
    }

    public function store(ChargeRequest $request)
    {
        $payload = $request->validated();

        $data = [];

        foreach ($payload['charges'] as $charge) {
            $price = [
                "name" => $payload['name'],
                "payment_assurance_id" => $charge['payment_assurance_id'],
                "price" => $charge['price'],
            ];

            $data[] = $price;
        }

        try {
            DB::beginTransaction();
            Charge::insert($data);
            DB::commit();
            return Inertia::location(route('backoffice.charge.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function show($id) {}

    public function update($id, ChargeRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy($id) {}
}
