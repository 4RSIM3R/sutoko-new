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

        $province = Region::where('kode_wilayah', $payload['province_id'])->first();
        $regency = Region::where('kode_wilayah', $payload['city_id'])->first();
        $district = Region::where('kode_wilayah', $payload['district_id'])->first();
        $village = Region::where('kode_wilayah', $payload['village_id'])->first();

        $payload['province_name'] = $province->nama_wilayah;
        $payload['city_name'] = $regency->nama_wilayah;
        $payload['district_name'] = $district->nama_wilayah;
        $payload['village_name'] = $village->nama_wilayah;

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
