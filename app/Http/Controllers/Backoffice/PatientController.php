<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Models\Patient;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPatient;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->get('page', 1);

        $patiens = Patient::query()->paginate(perPage: 10, page: $page);

        $patiens = [
            "prev_page" => $patiens->currentPage() > 1 ? $patiens->currentPage() - 1 : null,
            "items" => $patiens->items(),
            "next_page" => $patiens->hasMorePages() ? $patiens->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/patient/index', [
            'patiens' => $patiens,
        ]);
    }

    public function fetch(Request $request)
    {
        $search = $request->get('name');
        if ($search) {
            $name = Patient::select(['nik', 'name', 'id'])->where('name', 'like', '%' . $search . '%');
            $nik = Patient::select(['nik', 'name', 'id'])->where('nik', 'like', '%' . $search . '%');
            $result = $name->union($nik)->get();
        } else {
            $result = Patient::limit(10)->get();
        }
        return response()->json($result);
    }

    public function create()
    {
        return Inertia::render('backoffice/master/patient/form');
    }

    public function store(PatientRequest $request)
    {
        $payload = $request->validated();

        try {
            $token = SatuSehatAuth::token();
            $ihs = SatuSehatPatient::get_ihs($token, $payload['nik']);

            $payload['satu_sehat_id'] = $ihs;

            Patient::create($payload);

            return Inertia::location(route('backoffice.patient.index'));
        } catch (Exception $exception) {
            return back()->withErrors('errors', $exception->getMessage());
        }
    }

    public function show($id)
    {
        //
    }

    public function update($id, PatientRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy($id)
    {
        //
    }
}
