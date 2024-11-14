<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\PractionerRequest;
use App\Models\Practioner;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPractioner;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PractionerController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);

        $practioners = Practioner::query()->paginate(perPage: 10, page: $page);

        $practioners = [
            "prev_page" => $practioners->currentPage() > 1 ? $practioners->currentPage() - 1 : null,
            "items" => $practioners->items(),
            "next_page" => $practioners->hasMorePages() ? $practioners->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/practioner/index', [
            'practioners' => $practioners,
        ]);
    }

    public function fetch(Request $request)
    {
        $name = $request->get('name');
        if ($name) {
            $name = Practioner::select(['nik', 'name', 'id'])->where('name', 'like', '%' . $name . '%')->limit(10);
            $nik = Practioner::select(['nik', 'name', 'id'])->where('nik', 'like', '%' . $name . '%')->limit(10);
            $result = $name->union($nik)->get();
        } else {
            $result = Practioner::limit(10)->get();
        }
        return response()->json($result);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/practioner/form');
    }

    public function store(PractionerRequest $request)
    {
        $payload = $request->validated();

        try {
            $token = SatuSehatAuth::token();
            $ihs = SatuSehatPractioner::get_ihs($token, $payload['nik']);

            $payload['satu_sehat_id'] = $ihs;

            Practioner::create($payload);

            return Inertia::location(route('backoffice.practioner.index'));
        } catch (Exception $exception) {
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function show($id)
    {
        //
    }

    public function update($id, PractionerRequest $request)
    {
        //
    }

    public function destroy($id, PractionerRequest $request)
    {
        //
    }
}
