<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileRequest;
use App\Models\Profile;
use App\Models\Region;
use Exception;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $profile = Profile::query()->latest()->first();

        return Inertia::render('backoffice/setting/profile/index', [
            'profile' => $profile,
        ]);
    }

    public function update(ProfileRequest $request)
    {
        $payload = $request->validated();

        $province = Region::where('nama_wilayah', $payload['province'])->first();
        $regency = Region::where('nama_wilayah', $payload['regency'])->first();
        $district = Region::where('nama_wilayah', $payload['district'])->first();
        $village = Region::where('nama_wilayah', $payload['village'])->first();

        $payload['province_id'] = $province->id;
        $payload['city_id'] = $regency->id;
        $payload['district_id'] = $district->id;
        $payload['village_id'] = $village->id;

        $payload['province_name'] = $province->nama_wilayah;
        $payload['city_name'] = $regency->nama_wilayah;
        $payload['district_name'] = $district->nama_wilayah;
        $payload['village_name'] = $village->nama_wilayah;

        unset($payload['province']);
        unset($payload['regency']);
        unset($payload['district']);
        unset($payload['village']);

        try {
            DB::beginTransaction();
           
            $count = Profile::query()->count();

            if ($count > 0) {
                $profile = Profile::query()->latest()->first();
                $profile->update($payload);
            } else {
                $profile = Profile::create($payload);
            }

            DB::commit();
            return Inertia::location(route('backoffice.index'));
        } catch (Exception $exception) {
            DB::rollBack();
            return back()->withErrors('errors', $exception->getMessage());
        }
    }
}
