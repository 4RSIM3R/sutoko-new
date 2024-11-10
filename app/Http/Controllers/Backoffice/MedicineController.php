<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicineRequest;
use App\Utils\SatuSehat\SatuSehatAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MedicineController extends Controller
{
    public function index()
    {
        return Inertia::render('backoffice/master/medicine/index');
    }


    public function create(Request $request)
    {
        $name = $request->get('name');
        $page = $request->get('page', 1);
        $type = $request->get('type', 'farmasi');

        $params = [
            'page' => $page,
            'product_type' => $type,
            'size' => 10,
        ];

        if ($name) $params['keyword'] = $name;

        $token = SatuSehatAuth::token();

        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => sprintf('Bearer %s', $token),
        ])->get("https://api-satusehat-stg.kemkes.go.id/kfa-v2/products/all", $params);

        return Inertia::render('backoffice/master/medicine/form', [
            'medicines' => $response->json(),
        ]);
    }

    public function store(MedicineRequest $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update($id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
