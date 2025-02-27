<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\PaymentAssuranceContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentAssuranceRequest;
use App\Models\PaymentAssurance;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class PaymentAssuranceController extends Controller
{

    protected PaymentAssuranceContract $service;

    public function __construct(PaymentAssuranceContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/payment_assurance/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name'], ['name'], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/assurance/form');
    }

    public function store(PaymentAssuranceRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->create($payload);
        return WebResponse::inertia($data, 'backoffice.payment-assurance.index');
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/assurance/form', ["assurance" => $data]);
    }

    public function update($id, PaymentAssuranceRequest $request)
    {
        $payload = $request->all();
        $data = $this->service->update($id, $payload);
        return WebResponse::inertia($data, 'backoffice.payment-assurance.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::inertia($data, 'backoffice.payment-assurance.index');
    }
}
