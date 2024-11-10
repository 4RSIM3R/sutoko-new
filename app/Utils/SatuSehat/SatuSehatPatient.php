<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Facades\Http;

class SatuSehatPatient
{
    public static function get_ihs($token, $nik)
    {
        $base_url = config('satu_sehat.base_url');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'Authorization' => sprintf('Bearer %s', $token),
        ])->get("{$base_url}/Patient", [
            'identifier' => sprintf('https://fhir.kemkes.go.id/id/nik|%s', $nik),
        ]);

        return $response->json()["entry"][0]["resource"]["identifier"][0]["value"];
    }
}
