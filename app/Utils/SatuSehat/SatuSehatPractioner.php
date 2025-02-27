<?php

namespace App\Utils\SatuSehat;

use Exception;
use Illuminate\Support\Facades\Http;

class SatuSehatPractioner
{
    public static function get_ihs($token, $nik)
    {
        $base_url = config('satu_sehat.base_url');

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'Authorization' => sprintf('Bearer %s', $token),
            ])->get("{$base_url}/Practitioner", [
                'identifier' => sprintf('https://fhir.kemkes.go.id/id/nik|%s', $nik),
            ]);
            

            if ($response->failed()) throw SatuSehatError::handle($response);

            $json = $response->json();

            if (!isset($json["entry"][0]["resource"]["identifier"][0]["value"])) {
                throw new Exception("Data tidak ditemukan");
            }

            return $json["entry"][0]["resource"]["identifier"][0]["value"];
        } catch (Exception $e) {
            throw $e;
        }
    }
}
