<?php

namespace App\Utils\SatuSehat;

use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class SatuSehatAuth
{

    public static function token()
    {
        $cacheKey = 'satu_sehat_access_token';
        $cacheDuration = 60;

        return Cache::remember($cacheKey, $cacheDuration, function () {
            $auth_url = config('satu_sehat.auth_url');
            $client_id = config('satu_sehat.client_id');
            $client_secret = config('satu_sehat.client_secret');

            $response = Http::asForm()->post("{$auth_url}/accesstoken?grant_type=client_credentials", [
                'client_id' => $client_id,
                'client_secret' => $client_secret,
            ]);

            if ($response->failed()) {
                throw new Exception("Error getting access token");
            }

            return $response->json()["access_token"];
        });
    }
}
