<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\MedicineRequest;
use App\Models\Medicine;
use App\Utils\SatuSehat\SatuSehatAuth;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MedicineController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page', 1);

        $medicines = Medicine::query()->paginate(perPage: 10, page: $page);

        $medicines = [
            "prev_page" => $medicines->currentPage() > 1 ? $medicines->currentPage() - 1 : null,
            "items" => $medicines->items(),
            "next_page" => $medicines->hasMorePages() ? $medicines->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/medicine/index', [
            'medicines' => $medicines,
        ]);
    }

    public function fetch(Request $request)
    {
        $name = $request->get('name');
        if ($name) {
            $name = Medicine::select('*')->where('name', 'like', '%' . $name . '%')->limit(10);
            $trademark = Medicine::select('*')->where('trademark', 'like', '%' . $name . '%')->limit(10);
            $code = Medicine::select('*')->where('kfa_code', 'like', '%' . $name . '%')->limit(10);
            $result = $name->union($code)->union($trademark)->get();
        } else {
            $result = Medicine::limit(10)->get();
        }
        return response()->json($result);
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
            'items' => $response["items"]["data"],
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

    public function store(MedicineRequest $request)
    {
        $payload = $request->validated();

        DB::beginTransaction();

        try {
            $token = SatuSehatAuth::token();

            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => sprintf('Bearer %s', $token),
            ])->get("https://api-satusehat-stg.kemkes.go.id/kfa-v2/products", [
                "identifier" => "kfa",
                "code" => $payload['kfa_code'],
            ]);

            $response = $response->json()["result"];

            $data = [
                "name" => $response["name"],
                "trademark" => $response["nama_dagang"],
                "kfa_code" => $response["kfa_code"],
                "manufacturer" => $response["manufacturer"],
                "unit_of_meassurement" => $response["uom"]["name"],
                "payload" => json_encode($response),
            ];

            Medicine::create($data);

            DB::commit();
            return Inertia::location(route('backoffice.medicine.index'));
        } catch (Exception $exception) {
            dd($exception->getMessage());
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
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
