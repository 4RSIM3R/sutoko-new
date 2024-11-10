<?php

namespace App\Utils\SatuSehat;

use Illuminate\Support\Facades\Http;

class SatuSehatAuth
{
    
    public static function token()
    {
        $auth_url = config('satu_sehat.auth_url');
        $client_id = config('satu_sehat.client_id');
        $client_secret = config('satu_sehat.client_secret');

        $response = Http::asForm()->post("{$auth_url}/accesstoken?grant_type=client_credentials", [
            'client_id' => $client_id,
            'client_secret' => $client_secret,
        ]);

        return $response->json()["access_token"];
    }
}
