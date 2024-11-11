<?php

namespace App\Http\Controllers\Backoffice;

use App\Http\Controllers\Controller;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class RegionController extends Controller
{

    public function province(Request $request)
    {
        $name = $request->get('name');

        $result = Region::query()
            ->where('level', '=', 1)
            ->when($name, function ($query) use ($name) {
                $query->where('nama_wilayah', 'like', '%' . $name . '%');
            })
            ->get();

        return Response::json($result);
    }

    public function regency(Request $request)
    {
        $province_id = $request->get('province_id');
        $name = $request->get('name');

        $result = Region::query()
            ->where('level', '=', 2)
            ->when($name, function ($query) use ($name) {
                $query->where('nama_wilayah', 'like', '%' . $name . '%');
            })
            ->when($province_id, function ($query) use ($province_id) {
                $query->where('kode_wilayah', 'like', $province_id . '%');
            })
            ->get();

        return Response::json($result);
    }

    public function district(Request $request)
    {
        $regency_id = $request->get('regency_id');
        $name = $request->get('name');

        $result = Region::query()
            ->where('level', '=', 3)
            ->when($name, function ($query) use ($name) {
                $query->where('nama_wilayah', 'like', '%' . $name . '%');
            })
            ->when($regency_id, function ($query) use ($regency_id) {
                $query->where('kode_wilayah', 'like',  $regency_id . '%');
            })
            ->get();

        return Response::json($result);
    }

    public function village(Request $request)
    {
        $district_id = $request->get('district_id');
        $name = $request->get('name');

        $result = Region::query()
            ->where('level', '=', 4)
            ->when($name, function ($query) use ($name) {
                $query->where('nama_wilayah', 'like', '%' . $name . '%');
            })
            ->when($district_id, function ($query) use ($district_id) {
                $query->where('kode_wilayah', 'like', $district_id . '%');
            })
            ->get();

        return Response::json($result);
    }
}
