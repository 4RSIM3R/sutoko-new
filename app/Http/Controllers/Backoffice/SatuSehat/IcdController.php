<?php

namespace App\Http\Controllers\Backoffice\SatuSehat;

use App\Http\Controllers\Controller;
use App\Models\Icd10;
use App\Models\Icd9;
use Illuminate\Http\Request;

class IcdController extends Controller
{
    public function icd_9(Request $request)
    {
        $name = $request->get('name');

        $result = Icd9::query()->when($name, function ($query) use ($name) {
            return $query->where('english', 'like', '%' . $name . '%')
                ->orWhere('code', 'like', '%' . $name . '%')
                ->orWhere('indonesia', 'like', '%' . $name . '%');
        })->take(10)->get();

        return response()->json($result);
    }

    public function icd_10(Request $request)
    {
        $name = $request->get('name');

        $result = Icd10::query()->when($name, function ($query) use ($name) {
            return $query->where('english', 'like', '%' . $name . '%')
                ->orWhere('code', 'like', '%' . $name . '%')
                ->orWhere('indonesia', 'like', '%' . $name . '%');
        })->take(10)->get();

        return response()->json($result);
    }
}
