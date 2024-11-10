<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\PatientRequest;
use App\Models\Patient;
use App\Utils\SatuSehat\SatuSehatAuth;
use App\Utils\SatuSehat\SatuSehatPatient;
use App\Utils\SatuSehatClient;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {

        $page = $request->get('page', 1);
        $perPage = $request->get('perPage', 10);

        $patiens = Patient::query()->paginate(perPage: $perPage, page: $page);

        $patiens = [
            "prev_page" => $patiens->currentPage() > 1 ? $patiens->currentPage() - 1 : null,
            "items" => $patiens->items(),
            "next_page" => $patiens->hasMorePages() ? $patiens->currentPage() + 1 : null,
        ];

        return Inertia::render('backoffice/master/patient/index', [
            'patiens' => $patiens,
        ]);
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

    public function show(string $id)
    {
        //
    }

    public function update(string $id, PatientRequest $request)
    {
        $payload = $request->validated();
    }

    public function destroy(string $id)
    {
        //
    }
}
