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

        $request->session()->regenerate();

        return Inertia::render('backoffice/master/medicine/form', [
            'medicines' => $response->json(),
        ]);
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
