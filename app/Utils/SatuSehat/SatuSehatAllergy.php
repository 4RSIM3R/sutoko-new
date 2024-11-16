<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Facades\Http;

class SatuSehatAllergy
{
    public function compose($payload)
    {
        return [
            "resourceType" => "AllergyIntolerance",
        ];
    }

    public function create($token, $payload)
    {
        $response = Http::withHeaders([
            "Content-Type" => "application/json",
            "Authorization" => "Bearer $token",
        ])->post(sprintf("%s/Condition", config('satu_sehat.base_url')), $payload);

        return $response->json()["id"];
    }
}
