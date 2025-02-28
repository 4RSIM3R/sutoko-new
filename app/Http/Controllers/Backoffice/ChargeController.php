<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\ChargeContract;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChargeRequest;
use App\Models\Charge;
use App\Models\ChargeHasAssurance;
use App\Models\Assurance;
use App\Utils\WebResponse;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChargeController extends Controller
{

    protected ChargeContract $service;

    public function __construct(ChargeContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/charge/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name'], ['name'], true);
        return response()->json($data);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/charge/form');
    }

    public function store(ChargeRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->create($payload);
        return WebResponse::response($data, 'backoffice.charge.index');
        // $payload = $request->validated();
        // $charges = $payload['charges'];
        // unset($payload['charges']);

        // $data = [];

        // try {
        //     DB::beginTransaction();
        //     $result = Charge::query()->create($payload)->fresh();

        //     foreach ($charges as $charge) {
        //         $price = [
        //             "payment_assurance_id" => $charge['payment_assurance_id'],
        //             "charge_id" => $result->id,
        //             "price" => $charge['price'],
        //         ];

        //         $data[] = $price;
        //     }

        //     ChargeHasAssurance::query()->insert($data);

        //     DB::commit();
        //     return Inertia::location(route('backoffice.charge.index'));
        // } catch (Exception $exception) {
        //     dd($exception);
        //     DB::rollBack();
        //     return back()->withErrors('errors', $exception->getMessage());
        // }
    }

    public function show($id)
    {
        $data = $this->service->find($id);
        return Inertia::render('backoffice/master/charge/form', ["charge" => $data]);
    }

    public function update($id, ChargeRequest $request)
    {
        $payload = $request->validated();
        $data = $this->service->update($id, $payload);
        return WebResponse::response($data, 'backoffice.charge.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::response($data, 'backoffice.patient.index');
    }
}
