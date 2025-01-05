<?php

namespace App\Http\Controllers\Backoffice;

use App\Contract\Backoffice\MedicineContract;
use App\Http\Controllers\Controller;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\WebResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MedicineController extends Controller
{

    protected MedicineContract $service;

    public function __construct(MedicineContract $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return Inertia::render('backoffice/master/medicine/index');
    }

    public function fetch()
    {
        $data = $this->service->all(['name', 'kfa_code', 'trademark'], [], true);
        return response()->json($data);
    }

    public function kfa_browser(Request $request)
    {
        $filter = $request->get('filter');
        $page = $request->get('page', 1);

        $params = [
            'page' => $page,
            'product_type' => $filter["type"],
            'size' => 10,
        ];

        if (isset($filter["name"])) $params['keyword'] = $filter["name"];

        $token = SatuSehatAuth::token();

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => sprintf('Bearer %s', $token),
        ])->get("https://api-satusehat-stg.kemkes.go.id/kfa-v2/products/all", $params)->json();

        $response = [
            'items' => $response["items"]["data"] ?? [],
            'prev_page' => $response["page"] > 1 ? $response["page"] - 1 : null,
            'current_page' => $response["page"],
            'next_page' => ($response["total"] / ($response["size"] * $response["page"])) > 1 ? $response["page"] + 1 : null,
        ];

        return response()->json($response);
    }


    public function create()
    {
        return Inertia::render('backoffice/master/medicine/form');
    }

    public function store(Request $request)
    {
        $payload = $request->all();
        $data = $this->service->create($payload);
        return WebResponse::inertia($data, 'backoffice.medicine.index');
    }

    public function show($id)
    {
        //
    }

    public function update($id, Request $request)
    {
        $payload = $request->all();
        $data = $this->service->update($id, $payload);
        return WebResponse::inertia($data, 'backoffice.medicine.index');
    }

    public function destroy($id)
    {
        $data = $this->service->destroy($id);
        return WebResponse::inertia($data, 'backoffice.medicine.index');
    }
}
