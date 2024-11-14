<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentAssuranceRequest;
use App\Models\PaymentAssurance;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class PaymentAssuranceController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);
        $payment = PaymentAssurance::query()->paginate(perPage: 10, page: $page);
        $payment = [
            "prev_page" => $payment->currentPage() > 1 ? $payment->currentPage() - 1 : null,
            "items" => $payment->items(),
            "next_page" => $payment->hasMorePages() ? $payment->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/payment_assurance/index', [
            "payment" => $payment,
        ]);
    }

    public function fetch(Request $request)
    {
        $name =   $request->get('name');
        $result = PaymentAssurance::query()
            ->when($name, function ($query) use ($name) {
                $query->where('name', 'like', '%' . $name . '%');
            })
            ->limit(10)
            ->get();

        return Response::json($result);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/payment_assurance/form');
    }

    public function store(PaymentAssuranceRequest $request)
    {
        $payload = $request->validated();

        try {
            DB::beginTransaction();
            PaymentAssurance::create($payload);
            DB::commit();
            return Inertia::location(route('backoffice.payment-assurance.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function show($id) {}

    public function update($id) {}

    public function destroy($id) {}
}
