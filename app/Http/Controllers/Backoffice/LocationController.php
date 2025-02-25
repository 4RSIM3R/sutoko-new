<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\Location;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatLocation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LocationController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);

        $locations = Location::query()->paginate(perPage: 10, page: $page);

        $locations = [
            "prev_page" => $locations->currentPage() > 1 ? $locations->currentPage() - 1 : null,
            "items" => $locations->items(),
            "next_page" => $locations->hasMorePages() ? $locations->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/location/index', [
            'locations' => $locations,
        ]);
    }

    public function fetch(Request $request)
    {
        $search = $request->get('name');
        if ($search) {
            $name = Location::select('*')->where('name', 'like', '%' . $search . '%');
            $result = $name->get();
        } else {
            $result = Location::limit(10)->get();
        }
        return response()->json($result);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/location/form');
    }

    public function store(LocationRequest $request)
    {
        $payload = $request->validated();
        $payload["physical_type_name"] = Location::mapCodeToName[$payload["physical_type_code"]];
        $payload["satu_sehat_id"] = (string) Str::uuid();

        $client = new SatuSehatLocation();
        $compose = $client->compose($payload);

        try {
            DB::beginTransaction();
            $token = SatuSehatAuth::token();
            $response = $client->create($token, $compose);

            $payload["satu_sehat_id"] = $response;

            Location::create($payload);

            DB::commit();

            return Inertia::location(route('backoffice.location.index'));
        } catch (Exception $exception) {
            dd($exception);
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function show($id) {}

    public function update($id, LocationRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy($id) {}
}
