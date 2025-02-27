<?php

namespace App\Http\Controllers\Backoffice\SatuSehat;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicineRequest;
use App\Utils\SatuSehat\SatuSehatAuth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class KfaBrowserController extends Controller
{


    public function index(Request $request)
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

    public function store(MedicineRequest $request)
    {
        $payload = $request->validated();
    }
}
